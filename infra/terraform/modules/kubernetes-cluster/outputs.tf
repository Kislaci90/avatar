output "kubeconfig_path" {
  value       = pathexpand(var.kubeconfig_path)
  description = "Path to the kubeconfig file"
}

output "cluster_name" {
  value       = var.cluster_name
  description = "k3d cluster name"
}

