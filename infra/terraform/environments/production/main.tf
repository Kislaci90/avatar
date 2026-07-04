module "avatar_production" {
  source = "../../modules/production"

  namespace              = var.namespace
  postgres_password      = var.postgres_password
  postgres_storage_size  = var.postgres_storage_size
}

