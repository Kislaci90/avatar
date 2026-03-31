output "postgres_service_name" {
  value       = kubernetes_service.postgres.metadata[0].name
  description = "PostgreSQL Kubernetes service name"
}

output "postgres_host" {
  value       = "${kubernetes_service.postgres.metadata[0].name}.${var.namespace}.svc.cluster.local"
  description = "PostgreSQL internal DNS address"
}

output "postgres_port" {
  value       = 5432
  description = "PostgreSQL port"
}

