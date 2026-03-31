variable "namespace" {
  type        = string
  description = "Kubernetes namespace for database"
}

variable "postgres_password" {
  type        = string
  sensitive   = true
  description = "PostgreSQL admin password"
}

variable "storage_size" {
  type        = string
  description = "Storage size for PostgreSQL PVC"
  default     = "10Gi"
}

