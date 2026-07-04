output "namespace_name" {
  value       = module.shared.namespace_name
  description = "Name of the Avatar namespace"
}

output "database_endpoint" {
  value       = module.shared.database_endpoint
  description = "PostgreSQL service endpoint"
}

