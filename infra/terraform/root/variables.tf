# Cluster Configuration
variable "cluster_name" {
  type        = string
  description = "Name of the Kubernetes cluster"
  default     = "avatar"
}

variable "kubeconfig_path" {
  type        = string
  description = "Path where kubeconfig will be saved"
  default     = "~/.kube/config"
}

variable "namespace" {
  type        = string
  description = "Kubernetes namespace for Avatar application"
  default     = "avatar"
}

variable "environment" {
  type        = string
  description = "Environment name (local, staging, production)"
  default     = "local"
}

# Image Configuration
variable "image_registry" {
  type        = string
  description = "Container image registry"
  default     = "ghcr.io"
}

variable "backend_image_tag" {
  type        = string
  description = "Backend image tag"
  default     = "latest"
}

variable "frontend_image_tag" {
  type        = string
  description = "Frontend image tag"
  default     = "latest"
}

# Replicas
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

# Database
variable "postgres_password" {
  type        = string
  sensitive   = true
  description = "PostgreSQL admin password"
  default     = "changeme"
}

variable "postgres_storage_size" {
  type        = string
  description = "PostgreSQL storage size"
  default     = "10Gi"
}

# Service Types
variable "backend_service_type" {
  type        = string
  description = "Backend service type"
  default     = "ClusterIP"
}

variable "frontend_service_type" {
  type        = string
  description = "Frontend service type"
  default     = "LoadBalancer"
}

# ArgoCD Configuration
variable "enable_argocd" {
  type        = bool
  description = "Enable ArgoCD deployment"
  default     = false
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
  default     = "changeme"
}

variable "git_repo_url" {
  type        = string
  description = "Git repository URL for ArgoCD"
  default     = "https://github.com/your-org/avatar.git"
}

variable "git_branch" {
  type        = string
  description = "Git branch for ArgoCD to track"
  default     = "main"
}

variable "helm_path" {
  type        = string
  description = "Path in Git repo containing Helm charts"
  default     = "infra/helm"
}

