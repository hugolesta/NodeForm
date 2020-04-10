const fs = require('fs');
const ini = require("ini");
const inquirer = require('inquirer');
const credentialsFilePath = `${require('os').homedir()}/.aws/credentials`;
const credential = ini.parse(fs.readFileSync(credentialsFilePath, "utf-8"));

const execute = () => {
  return new Promise( async (resolve, reject) => {

    try {
      inquirer
      .prompt([
        {
          type: 'list',
          name: 'credential',
          message: 'Please select your aws profile.',
          choices: Object.keys(credential)
        },
      ])
      .then(async answers => {
        await fs.writeFileSync(`./.env`,`AWS_PROFILE=${answers.credential}`, (err) =>{
          if(err) throw err;
      });
        console.info(`You've selected the following profile: ${answers.credential}`);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
    
  });
}

module.exports = {
  execute
}