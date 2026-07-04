# Staging environment module - infrastructure only (no ArgoCD)

module "shared" {
  source = "../shared"

  namespace              = var.namespace
  postgres_password      = var.postgres_password
  postgres_storage_size  = var.postgres_storage_size
}

