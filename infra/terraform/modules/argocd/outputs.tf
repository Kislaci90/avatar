output "argocd_namespace" {
  value       = kubernetes_namespace.argocd.metadata[0].name
  description = "ArgoCD Kubernetes namespace"
}

output "argocd_server_url" {
  value       = "ArgoCD Server URL: Get external IP with: kubectl get svc -n argocd argocd-server"
  description = "How to access ArgoCD UI"
}

output "argocd_login_credentials" {
  value       = "Username: admin | Password: (set in terraform.tfvars as argocd_admin_password)"
  sensitive   = true
  description = "ArgoCD login credentials"
}

output "argocd_initial_setup" {
  value       = "To get ArgoCD external IP: kubectl get svc -n argocd argocd-server\nTo forward to localhost: kubectl port-forward svc/argocd-server -n argocd 8080:443"
  description = "Commands to access ArgoCD"
}

# Debugging outputs
output "helm_release_status" {
  value       = helm_release.argocd.status
  description = "Helm release deployment status"
}

output "helm_release_version" {
  value       = helm_release.argocd.version
  description = "Helm release chart version deployed"
}

output "helm_release_manifest" {
  value       = helm_release.argocd.manifest
  description = "Helm release manifest (useful for debugging)"
  sensitive   = true
}

