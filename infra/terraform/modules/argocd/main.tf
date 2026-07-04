resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
    labels = {
      "app.kubernetes.io/name" = "argocd"
    }
  }
}
resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = kubernetes_namespace.argocd.metadata[0].name
  create_namespace = false
  version          = var.argocd_version
  wait          = true
  wait_for_jobs = true
  timeout       = 600
  atomic        = false
  skip_crds     = false
  values = [
    yamlencode({
      global = {
        domain = "argocd.local"
      }
      server = {
        service = {
          type = "NodePort"
        }
        extraArgs = [
          "--insecure"
        ]
      }
      configs = {
        secret = {
          argocdServerAdminPassword = bcrypt(var.argocd_admin_password)
        }
        repositories = {
          "avatar-repo" = {
            url      = var.git_repo_url
            type     = "git"
            password = var.git_token
            username = "git"
          }
        }
      }
    })
  ]
  depends_on = [kubernetes_namespace.argocd]
}
resource "kubectl_manifest" "eywa_appset" {
  yaml_body = yamlencode({
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "ApplicationSet"
    metadata = {
      name      = "avatar-eywa"
      namespace = kubernetes_namespace.argocd.metadata[0].name
    }
    spec = {
      generators = [
        {
          list = {
            elements = [
              { env = "local",      namespace = "avatar-local",      syncWave = "0" },
              { env = "staging",    namespace = "avatar-staging",    syncWave = "1" },
              { env = "production", namespace = "avatar-production", syncWave = "2" }
            ]
          }
        }
      ]
      template = {
        metadata = {
          name      = "avatar-eywa-{{ env }}"
          namespace = kubernetes_namespace.argocd.metadata[0].name
        }
        spec = {
          project = "default"
          source = {
            repoURL        = var.git_repo_url
            targetRevision = var.git_branch
            path           = "infra/helm/eywa"
            helm = {
              releaseName = "avatar-eywa"
              valuesFiles = ["values.yaml", "../../../argocd/envs/{{ env }}/eywa-values.yaml"]
            }
          }
          destination = {
            server    = "https://kubernetes.default.svc"
            namespace = "{{ namespace }}"
          }
          syncPolicy = {
            automated = {
              prune    = true
              selfHeal = true
            }
            syncOptions = ["CreateNamespace=true"]
          }
        }
      }
    }
  })
  depends_on = [helm_release.argocd]
}
resource "kubectl_manifest" "pandora_appset" {
  yaml_body = yamlencode({
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "ApplicationSet"
    metadata = {
      name      = "avatar-pandora"
      namespace = kubernetes_namespace.argocd.metadata[0].name
    }
    spec = {
      generators = [
        {
          list = {
            elements = [
              { env = "local",      namespace = "avatar-local",      syncWave = "0" },
              { env = "staging",    namespace = "avatar-staging",    syncWave = "1" },
              { env = "production", namespace = "avatar-production", syncWave = "2" }
            ]
          }
        }
      ]
      template = {
        metadata = {
          name      = "avatar-pandora-{{ env }}"
          namespace = kubernetes_namespace.argocd.metadata[0].name
        }
        spec = {
          project = "default"
          source = {
            repoURL        = var.git_repo_url
            targetRevision = var.git_branch
            path           = "infra/helm/pandora"
            helm = {
              releaseName = "avatar-pandora"
              valuesFiles = ["values.yaml", "../../../argocd/envs/{{ env }}/pandora-values.yaml"]
            }
          }
          destination = {
            server    = "https://kubernetes.default.svc"
            namespace = "{{ namespace }}"
          }
          syncPolicy = {
            automated = {
              prune    = true
              selfHeal = true
            }
            syncOptions = ["CreateNamespace=true"]
          }
        }
      }
    }
  })
  depends_on = [helm_release.argocd]
}
