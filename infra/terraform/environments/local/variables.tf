# Pass through all variables from root
variable "cluster_name" {
  type    = string
  default = "avatar-local"
}

variable "namespace" {
  type    = string
  default = "avatar"
}

variable "environment" {
  type    = string
  default = "local"
}

variable "kubeconfig_path" {
  type    = string
  default = "~/.kube/config"
}

variable "image_registry" {
  type    = string
  default = "ghcr.io"
}

variable "backend_image_tag" {
  type    = string
  default = "latest"
}

variable "frontend_image_tag" {
  type    = string
  default = "latest"
}

variable "replicas_backend" {
  type    = number
  default = 1
}

variable "replicas_frontend" {
  type    = number
  default = 1
}

variable "postgres_password" {
  type      = string
  sensitive = true
  default   = "changeme"
}

variable "postgres_storage_size" {
  type    = string
  default = "5Gi"
}

variable "backend_service_type" {
  type    = string
  default = "ClusterIP"
}

variable "frontend_service_type" {
  type    = string
  default = "LoadBalancer"
}

variable "enable_argocd" {
  type    = bool
  default = false
}

variable "argocd_domain" {
  type    = string
  default = "argocd.local"
}

variable "argocd_admin_password" {
  type      = string
  sensitive = true
  default   = "changeme"
}

variable "git_repo_url" {
  type    = string
  default = "https://github.com/your-org/avatar.git"
}

variable "git_branch" {
  type    = string
  default = "main"
}

variable "helm_path" {
  type    = string
  default = "infra/helm"
}

