
const fs = require("fs-extra");

const prepareSymlink = (srcPath,dstPath) => {
    return new Promise( async (resolve, reject) =>{
        try {
            await resolve(fs.ensureSymlink(srcPath,dstPath));
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    prepareSymlink
}