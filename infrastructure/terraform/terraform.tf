terraform {
  required_version = ">= 1.5"
  required_providers {
    civo = {
      source  = "civo/civo"
      version = "1.0.19"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.38.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "3.1.0"
    }
    neon = {
      source = "kislerdm/neon"
    }
  }
}

provider "civo" {
  region = var.civo_region
}

# === KUBECONFIG APPROACH (RECOMMENDED) ===
resource "local_file" "kubeconfig" {
  content  = civo_kubernetes_cluster.this.kubeconfig
  filename = "${path.module}/environments/${var.env}/kubeconfig.yaml"
}

provider "kubernetes" {
  config_path = local_file.kubeconfig.filename
}

provider "helm" {
  kubernetes = {
    config_path = local_file.kubeconfig.filename
  }
}
