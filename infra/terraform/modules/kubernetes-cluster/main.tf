# Create K3d cluster - Cross-platform
resource "null_resource" "k3d_cluster" {
  provisioner "local-exec" {
    command = "k3d cluster create ${var.cluster_name} --agents 1 -p 8888:80@loadbalancer -p 8443:443@loadbalancer"
  }

  provisioner "local-exec" {
    when = destroy
    command = "k3d cluster delete ${self.triggers.cluster_name}"
  }

  triggers = {
    cluster_name = var.cluster_name
  }

  lifecycle {
    ignore_changes = [triggers]
  }
}