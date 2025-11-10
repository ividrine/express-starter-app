#!/usr/bin/env bash
APP_CONTAINER_NAME="express-server"
CLUSTER_NAME="app-cluster"
MONITORING_NS="monitoring"
APP_NS="app"
DB_NS="db"

create_ns_if_not_exists() {
    local ns=$1
    if ! kubectl get namespace "$ns" -o name >/dev/null 2>&1; then
        echo "Creating namespace: $ns"
        kubectl create namespace "$ns"
    else
        echo "Namespace $ns already exists"
    fi
}

helm repo add grafana https://grafana.github.io/helm-charts
helm repo add cnpg https://cloudnative-pg.github.io/charts
helm repo update

# Check if cluster exists, then create if not
if kind get clusters | grep -q "^${CLUSTER_NAME}$"; then
    echo "Cluster '${CLUSTER_NAME}' already exists. Skipping creation."
else
    echo "Creating cluster '${CLUSTER_NAME}'..."
    kind create cluster --name "$CLUSTER_NAME" --config ./k8s/kind/kind-cluster.yaml
fi

create_ns_if_not_exists $MONITORING_NS
create_ns_if_not_exists $APP_NS
create_ns_if_not_exists $DB_NS

docker build -t $APP_CONTAINER_NAME:latest .
kind load docker-image $APP_CONTAINER_NAME:latest --name $CLUSTER_NAME

helm upgrade --install cnpg cnpg/cloudnative-pg --namespace $DB_NS

kubectl wait --for=condition=available deployment/cnpg-cloudnative-pg -n $DB_NS --timeout=120s

helm upgrade --install k8s-monitoring grafana/k8s-monitoring -f ./k8s/helm/k8s-monitoring-values.yaml --namespace $MONITORING_NS 
helm upgrade --install grafana grafana/grafana --namespace $MONITORING_NS 
helm upgrade --install express-server ./k8s/helm/charts/express-server --namespace $APP_NS



