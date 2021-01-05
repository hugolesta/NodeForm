const fs = require("fs");
const terrafile = require("./terrafile.json");
const prompt = require("prompt");
const config = require("./config");

const writeTerrafile = (name, source, version, dependencies = []) => {
    return new Promise( async (resolve, reject) => {
        try {
            await terrafile.terraform_modules.push({name, source,version});
            await fs.writeFile("./utils/terrafile.json",JSON.stringify(terrafile), (err) => {
                if(err) {throw err}
            });
            resolve({status: 200, function: "writeTerrafile"});
        } catch (error) {
            reject(error);
        }
    }); 
};

const addModules = () => {
    return new Promise( async (resolve, reject) => {
        try {
            prompt.start();
            prompt.get(config.promptQuestions, async (err, result) => {
                if(err) {throw Error("Error on prompt.")}
                await config.schema.validateAsync(result);
                let {name, source, version} = result;
                writeTerrafile(name, source, version);
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    addModules,
    writeTerrafile
}