/* eslint-disable no-debugger, no-console */
const inquirer = require("inquirer");
const fs = require("fs");
const askForEnv = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await inquirer.prompt([{
                type: "input",
                name: "env",
                message: "What's your environment?",
                }
                ]).then(async (answers) => {
                        await fs.appendFile("./.env",`\nENV=${answers.env}`, (err) => {
                            if(err) {throw err;}
                        });
                    });
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const askForStack = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await inquirer.prompt([
                {
                    type: "input",
                    name: "stack",
                    message: "What's your stack?",
                }
            ]).then(async (answers) => {
                await fs.appendFile("./.env",`\nSTACK=${answers.stack}`, (err) => {
                    if(err) {throw err;}
                });
            });
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    askForEnv,
    askForStack
};