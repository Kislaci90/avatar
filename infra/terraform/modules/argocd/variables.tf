variable "argocd_version" {
  type        = string
  description = "ArgoCD Helm chart version"
  default     = "9.4.16"
}

variable "argocd_domain" {
  type        = string
  description = "Domain for ArgoCD server"
  default     = "argocd.local"
}

variable "argocd_admin_password" {
  type        = string
  sensitive   = true
  description = "ArgoCD admin password"
}

variable "argocd_replicas" {
  type        = number
  description = "Number of replicas for ArgoCD components"
  default     = 2
}

variable "git_repo_url" {
  type        = string
  description = "Git repository URL for ArgoCD"
}

variable "git_branch" {
  type        = string
  description = "Git branch for ArgoCD to track"
  default     = "main"
}

variable "helm_path" {
  type        = string
  description = "Path in Git repo containing Helm charts"
}

variable "avatar_namespace" {
  type        = string
  description = "Kubernetes namespace for Avatar application"
}

variable "image_registry" {
  type        = string
  description = "Container image registry"
  default     = "ghcr.io"
}

variable "backend_image_tag" {
  type        = string
  description = "Backend image tag"
}

variable "frontend_image_tag" {
  type        = string
  description = "Frontend image tag"
}

variable "replicas_backend" {
  type        = number
  description = "Number of backend replicas"
  default     = 2
}

variable "replicas_frontend" {
  type        = number
  description = "Number of frontend replicas"
  default     = 2
}

variable "postgres_password" {
  type        = string
  sensitive   = true
  description = "PostgreSQL password"
}

