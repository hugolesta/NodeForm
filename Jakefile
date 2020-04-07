let { task, desc, directory} = require('jake');
const tfenv = require('./utils/tfenv');
const config = require('./utils/config');
const environments = require('./utils/environments');
const modules = require('./utils/terraform_modules');
const symlink = require('./utils/symlinks');
const shell = require('shelljs');
const ENV =  process.env.env;
const VARS = `cd environments/${ENV} && AWS_SDK_LOAD_CONFIG=1`;

let stack = process.env.stack;
let modulesPath = `./environments/${ENV}/modules`;
if(!ENV) throw Error("You must to add a env parameter");
if(!stack) throw Error("You must to add stack parameter and one value");

desc('This is the default tak');
task('default', () =>{
    console.log('This is the default task.');
})

desc('Install tfenv in this S.O if isnt exists');
task('install-tfenv', async () => {
    await tfenv.installTfEnv();
});

desc('Create your environment folder and resolve terrafile');
task('get', async () => {
    await environments.createEnvironmentFolder(ENV);
    await modules.createModulesDirectory(ENV);
    await modules.deleteModulesCache(modulesPath);
    await modules.resolveTerrafileDependencies(modulesPath);
    await shell.exec(`${VARS} terraform get`);
});

desc('Use init after run the get task')
task('init', async () => {
    await symlink.prepareSymlink(`${__dirname}/common`,`${__dirname}/environments/${ENV}/common`);
    await symlink.prepareSymlink(`${__dirname}/templates`,`${__dirname}/environments/${ENV}/templates`);
    await symlink.prepareSymlink(`${__dirname}/keys`,`${__dirname}/environments/${ENV}/keys`);
    await shell.exec(`${VARS} terraform get`);
    await shell.exec(`${VARS} terraform init`);
});
