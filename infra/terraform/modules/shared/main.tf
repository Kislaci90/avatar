resource "kubernetes_namespace" "avatar" {
  metadata {
    name = var.namespace
  }
}

# Database
module "database" {
  source = "../database"

  namespace         = kubernetes_namespace.avatar.metadata[0].name
  postgres_password = var.postgres_password
  storage_size      = var.postgres_storage_size

  depends_on = [kubernetes_namespace.avatar]
}

