
const fs = require("fs-extra");

const prepareSymlink = (srcPath,dstPath) => {
    return new Promise((resolve, reject) =>{
        try {
            resolve(fs.ensureSymlink(srcPath,dstPath));
        } catch (error) {
            reject(error);
        }
    });
}

const removeSymlink = (dstPath) =>{
    return new Promise(  (resolve, reject) =>{
        try {
            resolve(fs.remove(dstPath))
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    prepareSymlink,
    removeSymlink
}