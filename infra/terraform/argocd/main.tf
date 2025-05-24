resource "helm_release" "argocd" {
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "7.8.13"
  create_namespace = true
  name      = "argocd"
  namespace = "argocd"
}

resource "docker_image" "registry" {
  name = "registry:latest"
}

resource "docker_container" "registry" {
  image = docker_image.registry.image_id
  name  = "registry"
  ports {
    internal = 5000
    external = 5000
  }
}

resource "docker_image" "pandora" {
  name = "localhost:5000/pandora:1.0.0"
  build {
    context = "${path.cwd}/../../../pandora"
  }
}

resource "docker_registry_image" "pandora" {
  name = docker_image.pandora.name
}

resource "argocd_application" "pandora" {
  metadata {
    name = "pandora"
    namespace = "avatar"
  }

  spec {
    project = "default"
    source {
      repo_url        = "localhost:5000/charts"
      chart           = "pandora"
      target_revision = "1.0.0"
      helm {
        parameter {
          name  = "image.tag"
          value = "1.0.0"
        }
        value_files = ["values.yml"]
      }
    }

    destination {
      server    = "https://kubernetes.default.svc"
      namespace = "default"
    }
  }
}