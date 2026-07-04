# Local environment module - includes ArgoCD
module "avatar_local" {
  source = "../../modules/local"

  namespace              = var.namespace
  postgres_password      = var.postgres_password
  postgres_storage_size  = var.postgres_storage_size

  argocd_domain          = var.argocd_domain
  argocd_admin_password  = var.argocd_admin_password
  argocd_version         = var.argocd_version

  git_repo_url           = var.git_repo_url
  git_token              = var.git_token
  git_branch             = var.git_branch
  helm_path              = var.helm_path
  image_registry         = var.image_registry
}

