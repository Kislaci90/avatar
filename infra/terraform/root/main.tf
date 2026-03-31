module "kubernetes_cluster" {
  source = "../modules/kubernetes-cluster"

  cluster_name    = var.cluster_name
  kubeconfig_path = var.kubeconfig_path
}

resource "kubernetes_namespace" "avatar" {
  metadata {
    name = var.namespace
  }

  depends_on = [module.kubernetes_cluster]
}


# Database
module "database" {
  source = "../modules/database"

  namespace          = kubernetes_namespace.avatar.metadata[0].name
  postgres_password  = var.postgres_password
  storage_size       = var.postgres_storage_size

  depends_on = [kubernetes_namespace.avatar]
}

module "argocd" {
  source = "../modules/argocd"

  argocd_domain          = var.argocd_domain
  argocd_admin_password  = var.argocd_admin_password
  git_repo_url           = var.git_repo_url
  git_branch             = var.git_branch
  helm_path               = var.helm_path
  avatar_namespace       = kubernetes_namespace.avatar.metadata[0].name
  image_registry         = var.image_registry
  backend_image_tag      = var.backend_image_tag
  frontend_image_tag     = var.frontend_image_tag
  postgres_password      = var.postgres_password

  depends_on = [kubernetes_namespace.avatar, module.kubernetes_cluster]

}
