const Joi = require("@hapi/joi");

const schema = Joi.object().keys({
    name: Joi.string()
                .min(3)
                .max(30)
                .required(),
    source: Joi.string()
                .pattern(/^([A-Za-z0-9]+@|http(|s):\/\/)([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d/\w.-]+?)(\.git)?$/i)
                .min(3)
                .max(60)
                .required(),
    version: Joi.string()
                .min(3)
                .max(30)
                .required()

});


module.exports = {
    "TFENVGITURL" : "https://github.com/tfutils/tfenv.git",
    "TFENVPATH": "~/.tfenv",
    "TFBINARY" : "terraform",
    "AWS_REGION": "us-east-1",
    "sharedFolder": "shared",
    "promptQuestions" : [
        {name: "name", required: true, description : "Please add new module name."}, 
        {name: "source", required: true, description : "Please add new module url."}, 
        {name: "version", required: true, description : "Please add new module release version."}, 
    ],
    "schema": schema
}