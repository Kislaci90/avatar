variable "cluster_name" {
  type        = string
  description = "Name of the Kubernetes cluster"
  default     = "avatar"
}

variable "kubeconfig_path" {
  type        = string
  description = "Path where kubeconfig will be saved"
  default     = "~/.kube/config"
}

