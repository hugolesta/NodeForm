const fs = require("fs");
const ini = require("ini");
const inquirer = require("inquirer");
const credentialsFilePath = `${require("os").homedir()}/.aws/credentials`;

const checkProfile = () => {
  return new Promise( async (resolve) => {
      let profile = process.env.AWS_PROFILE;
      if(!profile) {reject("You haven't selected any profile, please run jake manage-credentials task first");}
      console.log(`Your selected profile is: ${profile}`);
      resolve();
  });
};

const execute = () => {
  return new Promise( async (resolve, reject) => {

    try {
      inquirer
      .prompt([
        {
          type: "list",
          name: "credential",
          message: "Please select your aws profile.",
          choices: Object.keys(ini.parse(fs.readFileSync(credentialsFilePath, "utf-8")))
        },
      ])
      .then(async (answers) => {
        await fs.writeFileSync("./.env",`AWS_PROFILE=${answers.credential}`, (err) => {
          if(err) {throw err;}
      });
        console.info(`You've selected the following profile: ${answers.credential}`);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
    
  });
};

module.exports = {
  execute,
  checkProfile
};