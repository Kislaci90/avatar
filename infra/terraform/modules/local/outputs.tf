output "namespace_name" {
  value       = module.shared.namespace_name
  description = "Name of the Avatar namespace"
}

output "argocd_namespace" {
  value       = "argocd"
  description = "Namespace where ArgoCD is deployed"
}

