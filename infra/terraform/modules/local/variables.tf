variable "namespace" {
  type        = string
  description = "Kubernetes namespace for Avatar application"
}

variable "postgres_password" {
  type        = string
  sensitive   = true
  description = "PostgreSQL admin password"
}

variable "postgres_storage_size" {
  type        = string
  description = "PostgreSQL storage size"
}

variable "argocd_domain" {
  type        = string
  description = "Domain for ArgoCD server"
}

variable "argocd_admin_password" {
  type        = string
  sensitive   = true
  description = "ArgoCD admin password"
}

variable "argocd_version" {
  type        = string
  description = "ArgoCD Helm chart version"
}

variable "git_repo_url" {
  type        = string
  description = "Git repository URL for ArgoCD"
}

variable "git_token" {
  type        = string
  sensitive   = true
  description = "Git token for ArgoCD to access the repository"
}

variable "git_branch" {
  type        = string
  description = "Git branch for ArgoCD to track"
}

variable "helm_path" {
  type        = string
  description = "Path in Git repo containing Helm charts"
}

variable "image_registry" {
  type        = string
  description = "Container image registry"
}

