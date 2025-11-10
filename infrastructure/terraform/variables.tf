variable "civo_region" {
  description = "Civo region"
  type        = string
  default     = "LON1"
}

variable "cluster_name" {
  description = "Kubernetes cluster name"
  type        = string
  default     = "prod-k8s-cluster"
}

variable "civo_instance_size" {
  type    = string
  default = "g3.small"
}

variable "env" {
  type = string
}

variable "project_name" {
  type    = string
  default = "myapp"
}

# Cluster vars (passed from env)
variable "cluster_endpoint" { type = string }
variable "cluster_ca_certificate" { type = string }
variable "cluster_token" { type = string }
