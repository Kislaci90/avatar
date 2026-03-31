output "kubeconfig_configured" {
  value       = "Using kubeconfig at: ${var.kubeconfig_path}"
  description = "Kubeconfig path being used"
}

output "namespace" {
  value       = kubernetes_namespace.avatar.metadata[0].name
  description = "Kubernetes namespace for Avatar applications and DB"
}

# Database Outputs
output "postgres_service_name" {
  value       = module.database.postgres_service_name
  description = "PostgreSQL service name"
}

output "postgres_host" {
  value       = module.database.postgres_host
  description = "PostgreSQL internal DNS address"
}

# ArgoCD Outputs
output "argocd_namespace" {
  value       = module.argocd.argocd_namespace
  description = "ArgoCD namespace"
}

output "argocd_server_url" {
  value       = module.argocd.argocd_server_url
  description = "ArgoCD server access information"
}

output "argocd_initial_setup" {
  value       = module.argocd.argocd_initial_setup
  description = "ArgoCD setup commands"
}

