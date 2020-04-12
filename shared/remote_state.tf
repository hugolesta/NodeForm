data "terraform_remote_state" "vpc_state" {
  backend = "s3"
  config = {
    bucket = "terraform-nito-dev-vpc-tfstate"
    key = "nito/dev/terraform.sfstate"
    region = "us-east-1"
  }
}