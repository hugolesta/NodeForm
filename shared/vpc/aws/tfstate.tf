module "tfstate_backend" {
  source = "../modules/terraform-aws-tfstate-backend/"

  region          = var.env['region']
  environment     = var.env['environment']
  name            = var.env['name']

  force_destroy = true
}

output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

# Subnets
output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}


# terraform {
#   backend "s3" {
#     bucket = "terraform-nito-dev-vpc-tfstate"
#     key    = "nito/dev/terraform.sfstate"
#     region = "us-east-1"
#   }
# }