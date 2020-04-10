const fs = require('fs');

const createEnvironmentFolder = (folderName) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!fs.existsSync(`./environments/`)) await fs.mkdirSync(`./environments/`);
            if (!fs.existsSync(`./environments/${folderName}`)) {
                await fs.mkdirSync(`./environments/${folderName}`)
                console.log(`Folder ./environments/${folderName} has been created`);
            };
            resolve();
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    createEnvironmentFolder
}