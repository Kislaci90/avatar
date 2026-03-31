# Pass through all variables from root
variable "cluster_name" {
  type = string
}

variable "namespace" {
  type = string
}

variable "environment" {
  type = string
}

variable "kubeconfig_path" {
  type    = string
  default = "~/.kube/config"
}

variable "image_registry" {
  type = string
}

variable "backend_image_tag" {
  type = string
}

variable "frontend_image_tag" {
  type = string
}

variable "replicas_backend" {
  type = number
}

variable "replicas_frontend" {
  type = number
}

variable "postgres_password" {
  type      = string
  sensitive = true
}

variable "postgres_storage_size" {
  type = string
}

variable "backend_service_type" {
  type = string
}

variable "frontend_service_type" {
  type = string
}

variable "enable_argocd" {
  type = bool
}

variable "argocd_domain" {
  type = string
}

variable "argocd_admin_password" {
  type      = string
  sensitive = true
}

variable "git_repo_url" {
  type = string
}

variable "git_branch" {
  type = string
}

variable "helm_path" {
  type = string
}

