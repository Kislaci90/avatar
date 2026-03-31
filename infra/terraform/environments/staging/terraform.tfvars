# Staging Environment

cluster_name   = "avatar-staging"
namespace      = "avatar"
environment    = "staging"

# Image Configuration
image_registry            = "ghcr.io"
backend_image_tag         = "staging"
frontend_image_tag        = "staging"

# Replicas
replicas_backend  = 2
replicas_frontend = 2

# Database
postgres_password      = "change-me-in-production"
postgres_storage_size  = "20Gi"

# Service Types
backend_service_type  = "ClusterIP"
frontend_service_type = "LoadBalancer"

# ArgoCD - enabled for staging
enable_argocd            = true
argocd_domain            = "argocd-staging.example.com"
argocd_admin_password    = "change-me-in-production"
git_repo_url             = "https://github.com/your-org/avatar.git"
git_branch               = "staging"
git_path                 = "infra/helm"

