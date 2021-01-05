const fs = require("fs");
const fsextra = require("fs-extra");
const terrafile = require("./terrafile.json");
const shell = require("shelljs");

const createModulesDirectory = (folderName) => {
    return new Promise( async (resolve, reject) => {
        try {
            const path = `./environments/${folderName}/modules`;
            if(!fs.existsSync(path)) {
                resolve(await fs.mkdirSync(path));
                console.log(`Folder ${path} has been created`);
            }
            resolve();  
        } catch (error) {
            reject(error);
        }
    });
}

const deleteModulesCache = (ModulesFolder) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log("Deleting modules cache!");
            await fs.readdirSync(ModulesFolder).map(async (subFolder) => {
                await fsextra.removeSync(`${ModulesFolder}/${subFolder}`);
                console.log(`Subfolder ${subFolder} has been deleted`);
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

const resolveTerrafileDependencies = (ModulesFolder) => {
    return new Promise( async (resolve, reject) => {
        try {
            await terrafile.terraform_modules.map(async (module) => {
                let cloneCode = await shell.exec(`git clone -b  ${module.version} ${module.source} ${ModulesFolder}/${module.name} > /dev/null 2>&1`).code;
                if(cloneCode === 0) {console.log(`The module ${module.name} has been cloned in ${ModulesFolder}`)};
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {
    createModulesDirectory,
    deleteModulesCache,
    resolveTerrafileDependencies
}