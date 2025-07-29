terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "2.36.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
      argocd = {
        source = "jojand/argocd"
        version = "2.3.2"
      }
  }
}

provider "docker" {
  registry_auth {
    address = "http://localhost:5000"
    auth_disabled = true
  }
}

provider "helm" {
  kubernetes {
    config_path = "C:\\Users\\lejsz\\.kube\\config"
  }
}

provider "kubernetes" {
  config_path    = "C:\\Users\\lejsz\\.kube\\config"
  config_context = "docker-desktop"
}

provider "argocd" {
  server_addr = "localhost:1111"
  username = "admin"
  password = "kvMaJKXDOjNwmY3N"
  insecure = true
}
