# Include the root Terraform configuration from the parent directory
module "avatar" {
  source = "../../root"

  cluster_name              = var.cluster_name
  namespace                 = var.namespace
  environment               = var.environment
  kubeconfig_path           = var.kubeconfig_path
  image_registry            = var.image_registry
  backend_image_tag         = var.backend_image_tag
  frontend_image_tag        = var.frontend_image_tag
  replicas_backend          = var.replicas_backend
  replicas_frontend         = var.replicas_frontend
  postgres_password         = var.postgres_password
  postgres_storage_size     = var.postgres_storage_size
  backend_service_type      = var.backend_service_type
  frontend_service_type     = var.frontend_service_type
  enable_argocd             = var.enable_argocd
  argocd_domain             = var.argocd_domain
  argocd_admin_password     = var.argocd_admin_password
  git_repo_url              = var.git_repo_url
  git_branch                = var.git_branch
  helm_path                  = var.git_path
}

