let { task, desc, directory} = require('jake');
const tfenv = require('./utils/tfenv');
const config = require('./utils/config');
const environments = require('./utils/environments');
const modules = require('./utils/terraform_modules');
const shell = require('shelljs');
const ENV =  process.env.env;
const VARS = `cd environments/${ENV} && AWS_SDK_LOAD_CONFIG=1`;

if(!ENV) throw Error("You must to add a env parameter");

desc('This is the default tak');
task('default', () =>{
    console.log('This is the default task.');
})

desc('Install tfenv in this S.O if isnt exists');
task('install-tfenv', async () => {
    await tfenv.installTfEnv();
});

desc('Create your environment folder <folderName>');
task('get', async () => {
    await environments.createEnvironmentFolder(ENV);
    let stack = process.env.stack;
    if(!stack) throw Error("You must to add stack parameter and one value");
    await modules.createModulesDirectory(ENV);
    let modulesPath = `./environments/${ENV}/modules`;
    await modules.deleteModulesCache(modulesPath);
    await modules.resolveTerrafileDependencies(modulesPath);
    await shell.exec(`${VARS} terraform get`);
});
