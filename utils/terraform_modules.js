const config = require('./config');
const fs = require('fs');
const fsextra = require('fs-extra');
const path = require('path')

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
            console.log(ModulesFolder);
            console.log("Deleting modules cache!");
            await fs.readdirSync(ModulesFolder).map(subFolder => {
                fsextra.remove(`${ModulesFolder}/${subFolder}`);
                console.log(`Subfolder ${subFolder} has been deleted`);
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createModulesDirectory,
    deleteModulesCache
}