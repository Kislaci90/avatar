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

