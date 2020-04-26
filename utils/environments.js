const fs = require('fs');
const fsExtra = require('fs-extra');

const createEnvironmentFolder = (folderName,stack) => {
    return new Promise( (resolve, reject) => {
        try {
            let tfvarsFile = `./environments/${folderName}/${stack}/${folderName}.auto.tfvars`;
            let vpcTfvarsFile = `./environments/${folderName}/vpc/${folderName}.auto.tfvars`;
            if (!fs.existsSync(`./environments/`)) fs.mkdirSync(`./environments/`);
            if (!fs.existsSync(`./environments/${folderName}`)) {
                fs.mkdirSync(`./environments/${folderName}`);
                console.log(`Folder ./environments/${folderName} has been created`);
            };
            if(!fsExtra.ensureFileSync(vpcTfvarsFile)){
                fs.openSync(vpcTfvarsFile,'w');
                console.log(`The file ${vpcTfvarsFile} has been created inside stack ${stack}`);
            }
            if(!fsExtra.ensureFileSync(tfvarsFile)) {
                fs.openSync(tfvarsFile,'w');
                console.log(`The file ${folderName}.auto.tfvars has been created`);
            }
            resolve();
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    createEnvironmentFolder
}