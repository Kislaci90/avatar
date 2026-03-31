# Local backend - uses local file state
# For production, use S3, Azure Blob Storage, or Terraform Cloud

terraform {
  backend "local" {
    path = "/state/terraform.tfstate"
  }
}

