
const { spawn } = require('child_process');
require('dotenv').config();

const internalProcess = (command, parametersList,path) => {
    if(!process.env.AWS_PROFILE) throw Error('First you should populate the AWS_PROFILE variable, make sure to execute the manage-credentials task');
    return new Promise(async (resolve, reject) =>{
        try {
            const child =  await spawn(command, parametersList, {cwd: path});

            process.stdin.pipe(child.stdin);

            await child.on('exit', (code, signal) => {
                resolve(code);
                process.exit();
            });

            await child.stdout.on('data', data => {
                console.log(data.toString());
            });
            await child.stdin.on('data', data => {
                resolve(console.log(data.toString()));
            });
            await child.stderr.on('data', data => {
                reject(console.log(data.toString()));
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    internalProcess
}