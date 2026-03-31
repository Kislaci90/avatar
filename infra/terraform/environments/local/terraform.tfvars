# Kubernetes Configuration
# IMPORTANT: Update kubeconfig_path to point to your Kubernetes cluster
# Examples:
#   - Docker Desktop: C:\Users\laszl\.kube\config
#   - k3d: C:\Users\laszl\.kube\config (after k3d creates it)
#   - kind: C:\Users\laszl\.kube\config (after kind creates it)
#   - k0s: C:\ProgramData\k0s\pki\admin.conf (after k0s install)
kubeconfig_path = "C:\\Users\\laszl\\.kube\\config"

cluster_name          = "avatar-local"
namespace             = "avatar"
enable_argocd         = true             # Enable ArgoCD deployment
image_registry        = "localhost:5000" # or use local registry
backend_image_tag     = "local"
frontend_image_tag    = "local"
replicas_backend      = 1
replicas_frontend     = 1
postgres_password     = "local-dev-password"
argocd_domain         = "argocd.local"
argocd_admin_password = "admin-password-123"
git_repo_url          = "https://github.com/Kislaci90/avatar.git"
git_branch            = "daily"
helm_path             = "infra/helm"
