provider "aws" {
  region = var.env["region"]

  # Any non-beta version >= 1.0.0 and < 3.0.0
  version = "~> 2.0"
}
