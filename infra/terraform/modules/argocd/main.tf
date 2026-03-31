resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
    labels = {
      "app.kubernetes.io/name" = "argocd"
    }
  }
}

# Note: Admin password is managed separately via kubectl secret
# The password is set to a bcrypt hash of the argocd_admin_password variable
# See: kubectl create secret generic argocd-secret -n argocd --from-literal=admin.password='<bcrypt-hash>'
resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = kubernetes_namespace.argocd.metadata[0].name
  create_namespace = false
  version          = var.argocd_version

  # Better error detection
  wait            = true
  wait_for_jobs   = true
  timeout         = 600 # 10 minutes in seconds
  atomic          = false # Set to true to rollback on failure
  skip_crds       = false # Ensure CRDs are installed

  values = [
    yamlencode({
      global = {
        domain = var.argocd_domain
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
      }
      repoServer = {
        replicas = var.argocd_replicas
      }
      controller = {
        replicas = var.argocd_replicas
      }
      applicationSet = {
        replicas = var.argocd_replicas
      }
    })
  ]

  depends_on = [kubernetes_namespace.argocd]
}

resource "kubectl_manifest" "argocd_avatar_eva" {
  yaml_body = yamlencode({
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      name      = "avatar-eva"
      namespace = kubernetes_namespace.argocd.metadata[0].name
    }
    spec = {
      project = "default"
      source = {
        repoURL        = var.git_repo_url
        targetRevision = var.git_branch
        path           = "${var.helm_path}/eva"
        helm = {
          releaseName = "avatar-eva"
          values = yamlencode({
            frontend = {
              image = {
                registry   = var.image_registry
                tag        = var.frontend_image_tag
              }
              replicas = var.replicas_frontend
            }
            database = {
              password = var.postgres_password
            }
          })
        }
      }
      destination = {
        server    = "https://kubernetes.default.svc"
        namespace = var.avatar_namespace
      }
      syncPolicy = {
        automated = {
          prune   = true
          selfHeal = true
        }
        syncOptions = ["CreateNamespace=true"]
      }
    }
  })

  depends_on = [helm_release.argocd]
}

resource "kubectl_manifest" "argocd_avatar_pandora" {
  yaml_body = yamlencode({
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      name      = "avatar-pandora"
      namespace = kubernetes_namespace.argocd.metadata[0].name
    }
    spec = {
      project = "default"
      source = {
        repoURL        = var.git_repo_url
        targetRevision = var.git_branch
        path           = "${var.helm_path}/pandora"
        helm = {
          releaseName = "avatar-pandora"
          values = yamlencode({
            pandora = {
              image = {
                registry   = var.image_registry
                tag        = var.frontend_image_tag
              }
              replicas = var.replicas_frontend
            }
            database = {
              password = var.postgres_password
            }
          })
        }
      }
      destination = {
        server    = "https://kubernetes.default.svc"
        namespace = var.avatar_namespace
      }
      syncPolicy = {
        automated = {
          prune   = true
          selfHeal = true
        }
        syncOptions = ["CreateNamespace=true"]
      }
    }
  })

  depends_on = [helm_release.argocd]
}
