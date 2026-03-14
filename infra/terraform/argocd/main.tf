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