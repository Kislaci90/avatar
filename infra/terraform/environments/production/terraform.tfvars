# Production Environment

cluster_name   = "avatar-prod"
namespace      = "avatar"
environment    = "production"

# Image Configuration
image_registry            = "ghcr.io"
backend_image_tag         = "v1.0.0"  # Use specific version tags in production
frontend_image_tag        = "v1.0.0"

# Replicas (higher for production)
replicas_backend  = 3
replicas_frontend = 3

# Database
postgres_password      = "change-me-in-production"
postgres_storage_size  = "100Gi"

# Service Types
backend_service_type  = "ClusterIP"
frontend_service_type = "LoadBalancer"

# ArgoCD - enabled
enable_argocd            = true
argocd_domain            = "argocd.example.com"
argocd_admin_password    = "change-me-in-production"
git_repo_url             = "https://github.com/your-org/avatar.git"
git_branch               = "main"
git_path                 = "infra/helm"

