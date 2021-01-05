const spawn  = require("child_process").spawn;
require("dotenv").config();

const internalProcess = (command, parametersList,path) => {
    if(!process.env.AWS_PROFILE) {throw Error("First you should populate the AWS_PROFILE variable, make sure to execute the manage-credentials task");}
    return new Promise((resolve, reject) => {
        try {
            const child = spawn(command, parametersList, {cwd: path});

            process.stdin.pipe(child.stdin);

            child.on("exit", (code) => {
                resolve(code);
                process.exit();
            });

            child.stdout.on("data", (data) => {
                // eslint-disable-next-line no-console
                console.log(data.toString());
            });
            child.stdin.on("data", (data) => {
                // eslint-disable-next-line no-console
                resolve(console.log(data.toString()));
            });
            child.stderr.on("data", (data) => {
                // eslint-disable-next-line no-console
                reject(console.log(data.toString()));
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    internalProcess
};