module.exports = {
    terraform_modules : [
        {
            name: "terraform-aws-alb",
            source: "git@github.com:cloudposse/terraform-aws-alb",
            version: "0.7.0",
            dependency: ""
        },
        {
            name: "container_definition",
            source: "git@github.com:cloudposse/terraform-aws-ecs-container-definition",
            version: "0.21.0",
            dependency: ""
        }
    ]
}