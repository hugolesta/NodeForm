let { task, desc, directory} = require('jake');
const tfenv = require('./utils/tfenv');
const config = require('./utils/config');
const environments = require('./utils/environments');
const modules = require('./utils/terraform_modules');
const homedir = require('os').homedir();
desc('This is the default tak');
task('default', () =>{
    console.log('This is the default task.');
})

desc('Install tfenv in this S.O if isnt exists');
task('install-tfenv', async () => {
    await tfenv.installTfEnv();
});

desc('Create your environment folder <folderName>');
task('get', async (folderName) => {
    if(!folderName) throw Error("You must to add a folderName argument");
    await environments.createEnvironmentFolder(folderName);
    let stack = process.env.stack;
    if(!stack) throw Error("You must to add stack parameter and one value");
    await modules.createModulesDirectory(folderName);
    let modulesPath = `./environments/${folderName}/modules`;
    await modules.deleteModulesCache(modulesPath);

});
