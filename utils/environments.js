const config = require('./config');
const fs = require('fs');

const createEnvironmentFolder = (folderName) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!fs.existsSync(`environments/${folderName}`)) await fs.mkdirSync(`environments/${folderName}`);
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    createEnvironmentFolder
}