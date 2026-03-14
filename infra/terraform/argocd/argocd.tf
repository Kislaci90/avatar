resource "argocd_project" "avatar" {
  metadata {
    name      = "avatar"
    namespace = "argocd"
  }

  spec {
    description = "Avatar apps"

    source_repos = ["*"]

    destinations {
      server    = "*"
      namespace = "*"
    }

    cluster_resource_whitelist {
      group = "*"
      kind  = "*"
    }
  }
}


resource "argocd_application" "pandora" {
  metadata {
    name      = "pandora"
    namespace = "argocd"
  }

  spec {
    project = argocd_project.avatar.metadata[0].name

    source {
      repo_url        = "https://github.com/kubernetes/examples.git"
      path            = "staging/nginx"
      target_revision = "HEAD"
    }

    destination {
      server    = "https://kubernetes.default.svc"
      namespace = "pandora"
    }

    sync_policy {
      automated {
        prune     = true
        self_heal = true
      }
    }
  }
}

