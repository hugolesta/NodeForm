const GITURL = "https://github.com/tfutils/tfenv.git";
const commandExists = require('command-exists');

const checkIfTfenvWasInstalled = async() => {
    return new Promise( (resolve, reject ) => {
        try {
            commandExists('tfenv', (err, commandExists) => {
                resolve(commandExists);
                if(err){
                    reject(err);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    checkIfTfenvWasInstalled
}