const config = require("./config");
const commandExists = require("command-exists");
const shell = require("shelljs");

const checkIfTfenvWasInstalled = (program) => {
    return new Promise( async (resolve, reject ) => {
        try {
            commandExists(program, (err, commandExists) => {
                if(err){
                    reject(err);
                }
                commandExists ? console.log(`${program} is already installed`) : console.log(`${program} is not installed in your S.O`);
                resolve(commandExists);
            });
        } catch (error) {
            reject(error);
        }
    });
};

const installTfEnv = () => {
    return new Promise( async (resolve, reject) => {
        try {
            //check if tfenv was installed.
            let tfenvStatus = await checkIfTfenvWasInstalled("tfenv");
            
            if(!tfenvStatus) {

                let brewStatus = await checkBrewExists("tfenv");

                if(!brewStatus) {
                    //Clone tfenv and install manually
                    let cloneCode = await shell.exec(`git clone ${config.TFENVGITURL} ${config.TFENVPATH}`).code;
                    console.log(`Cloning tfenv repo and it was returned the following code ${cloneCode}`)
                    if(cloneCode === 0) await shell.exec(`sudo ln -s ${config.TFENVPATH}/bin/* /usr/local/bin`);
                }
            }

        } catch (error) {
            reject(error);
        }
    });
};

const checkBrewExists = (program) => {
    return new Promise( async (resolve, reject) => {
        try {
            let brewStatus = await checkIfTfenvWasInstalled("brew");
            if(brewStatus) {
                let status = await shell.exec(`brew install ${program}`);
                console.log(`bre return the following code: ${status.code}`);
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    checkIfTfenvWasInstalled,
    installTfEnv
}