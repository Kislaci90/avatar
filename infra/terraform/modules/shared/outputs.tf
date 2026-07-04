output "namespace_name" {
  value       = kubernetes_namespace.avatar.metadata[0].name
  description = "Name of the created Kubernetes namespace"
}

output "database_endpoint" {
  value       = "postgres:5432"
  description = "PostgreSQL service endpoint"
}

