resource "helm_release" "argocd" {
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "7.8.13"
  create_namespace = true
  name      = "argocd"
  namespace = "argocd"
}