variable "namespace" {
  type    = string
}

variable "postgres_password" {
  type      = string
  sensitive = true
}

variable "postgres_storage_size" {
  type    = string
}

variable "git_repo_url" {
  type    = string
}

variable "git_token" {
  type      = string
  sensitive = true
}

variable "git_branch" {
  type    = string
}

variable "helm_path" {
  type    = string
}

variable "argocd_domain" {
  type    = string
}

variable "argocd_admin_password" {
  type      = string
  sensitive = true
}

variable "argocd_version" {
  type    = string
  default = "9.4.16"
}

variable "image_registry" {
  type    = string
}

