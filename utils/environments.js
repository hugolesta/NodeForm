const fs = require("fs");
const fsExtra = require("fs-extra");
const resolve = require('path').resolve
const createEnvironmentFolder = (folderName,stack) => {
    return new Promise( (resolve, reject) => {
        try {
            let tfvarsFile = `${__dirname}/../environments/${folderName}/${stack}/${folderName}.auto.tfvars`;
            let vpcTfvarsFile = `${__dirname}/../environments/${folderName}/vpc/${folderName}.auto.tfvars`;
            if (!fs.existsSync(`./environments/`)) {fs.mkdirSync("./environments/")}
            if (!fs.existsSync(`./environments/${folderName}`)) {
                fs.mkdirSync(`${__dirname}/../environments/${folderName}`);
                console.info(`Folder ·/environments/${folderName} has been created`);
            }
            if(!fsExtra.ensureFileSync(vpcTfvarsFile)){
                fs.openSync(vpcTfvarsFile,"w");
                console.info(`The file ${vpcTfvarsFile} has been created inside stack ${stack}`);
            }
            if(!fsExtra.ensureFileSync(tfvarsFile)) {
                fs.openSync(tfvarsFile,"w");
                console.info(`The file ${folderName}.auto.tfvars has been created`);
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createEnvironmentFolder
}