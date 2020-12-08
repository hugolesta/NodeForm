variable "env" {
  description = "Map containing all the environment configuration"
  type        = map(string)
  default = {
    name       = "NodeForm"
    prefix     = ""
    region     = "us-east-1"
    key_name   = "default"
    project    = "terraform-automation"
    costCenter = "Cloud Emgineers"
    owner      = "default"
    namespace  = "project"
    stage      = "sdx"

  }
}