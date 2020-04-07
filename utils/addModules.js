const fs = require('fs');
const terrafile = require('./terrafile.json');
const prompt = require('prompt');

const writeTerrafile = (name, source, version, dependencies = []) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            await terrafile.terraform_modules.push({"name": name, "source": source, "version": version, "dependencies": dependencies});
            await fs.writeFile('./utils/terrafile.json',JSON.stringify(terrafile), (err) =>{
                if(err) throw err;
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    }); 
}

const addModules = () => {
    return new Promise( async (resolve, reject) =>{
        try {
            prompt.start();
            prompt.get([{name: 'name', required: true}, {name: 'source', required: true}, {name: 'version', required: true}, {name: 'dependencies', required: true}], (err, result) =>{
                if(err) throw Error("Error on prompt.")
                let {name, source, version, dependencies} = result;
                writeTerrafile(name, source, version, dependencies);
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    addModules
}