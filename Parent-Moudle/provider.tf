terraform {
  required_version = ">= 1.0.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "B18_G2_RG"
    storage_account_name = "b18g2storage"
    container_name       = "b18g2container"
    key                  = "terraform.tfstate"
  }
}
provider "azurerm" {
  features {}
  subscription_id = "191839a3-3fe2-4852-b995-88a675fc1f7f"
}



