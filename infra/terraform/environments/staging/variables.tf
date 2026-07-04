# Staging environment variables
variable "namespace" {
  type = string
}

variable "postgres_password" {
  type      = string
  sensitive = true
}

variable "postgres_storage_size" {
  type = string
}

