#!/usr/bin/env bash
APP_CONTAINER_NAME="express-server"
CLUSTER_NAME="app-cluster"

# Install required helm repos
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add cnpg https://cloudnative-pg.github.io/charts
helm repo add cilium https://helm.cilium.io
helm repo add kyverno https://kyverno.github.io/kyverno/
helm repo update

# Check if cluster exists, then create if not
if kind get clusters | grep -q "^${CLUSTER_NAME}$"; then
    echo "Cluster '${CLUSTER_NAME}' already exists. Skipping creation."
else
    echo "Creating cluster '${CLUSTER_NAME}'..."
    kind create cluster --name "$CLUSTER_NAME" --config ./k8s/kind/kind-config.yaml
fi

# Create namespaces
kubectl apply -f ./k8s/manifests/namespace.yaml

# Install Gateway API CRDs
kubectl apply --server-side -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.4.0/standard-install.yaml
kubectl apply --server-side -f https://raw.githubusercontent.com/kubernetes-sigs/gateway-api/v1.4.0/config/crd/experimental/gateway.networking.k8s.io_tlsroutes.yaml

# Install Cilium
helm upgrade --install cilium cilium/cilium --version 1.19.0-pre.2 -n kube-system -f ./k8s/helm/cilium-values-local.yaml --wait

# Install CNPG Operator
helm upgrade --install cnpg cnpg/cloudnative-pg -n cnpg-system --create-namespace --wait

# Install Kyverno / Copy db secrets to app namespace
helm upgrade --install kyverno kyverno/kyverno -n kyverno --create-namespace --wait
kubectl apply -f ./k8s/manifests/sync-secrets.yaml

# Deploy database
helm upgrade --install database-cluster cnpg/cluster -n database --wait

# Build and load app image to kind
# docker build -t $APP_CONTAINER_NAME:latest .
kind load docker-image $APP_CONTAINER_NAME:latest --name $CLUSTER_NAME

# Deploy networking
kubectl apply -f ./k8s/manifests/gateway.yaml
kubectl apply -f ./k8s/manifests/ippool.yaml
kubectl apply -f ./k8s/manifests/l2policy.yaml

# Deploy application
kubectl apply -f ./k8s/manifests/app.yaml


LB_IP=$(kubectl get svc -n networking cilium-gateway-cilium-gateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
LB_PORT=$(kubectl get svc -n networking cilium-gateway-cilium-gateway -o jsonpath='{.spec.ports[0].port}')

# Deploy proxy pod to allow access from localhost on mac/windows
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: lb-proxy
  namespace: default
  labels:
    app: lb-proxy
spec:
  containers:
  - name: socat
    image: alpine/socat
    command: ["socat"]
    args: ["TCP-LISTEN:8080,fork", "TCP:${LB_IP}:${LB_PORT}"]
    securityContext:
      capabilities:
        add: ["NET_ADMIN"]
EOF

kubectl wait --for=condition=Ready pod/lb-proxy --timeout=60s

# Port forward to socat proxy pod 
kubectl port-forward pod/lb-proxy 8080:8080

echo "Application is now available at http://localhost:8080"



    



