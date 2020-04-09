let { task, desc} = require('jake');
const tfenv = require('./utils/tfenv');
const environments = require('./utils/environments');
const modules = require('./utils/terraform_modules');
const symlink = require('./utils/symlinks');
const execution = require('./utils/terraformExecution');
const ENV =  process.env.env;
const addModuleToTerrafile = require('./utils/addModules');
const glob = require('glob');
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
    execution.internalProcess('terraform', ['get'],`${__dirname}/environments/${ENV}/`)
});

desc('Use init after run the get task')
task('init', async () => {

    await glob(`${__dirname}/common/*.tf`, {}, async (err, files)=>{
        await files.map(file =>{
            fileName = file.split('/');
            symlink.prepareSymlink(file,`${__dirname}/environments/${ENV}/common/${fileName[fileName.length -1]}`);
        });
    });

    await symlink.prepareSymlink(`${__dirname}/templates`,`${__dirname}/environments/${ENV}/templates`);
    await symlink.prepareSymlink(`${__dirname}/keys`,`${__dirname}/environments/${ENV}/keys`);
    execution.internalProcess('terraform', ['get'],`${__dirname}/environments/${ENV}/`)
    execution.internalProcess('terraform', ['init'],`${__dirname}/environments/${ENV}/`)

});

desc('Only use when you need check terraform resources');
task('plan',async () => {
    let commands = ['plan'];
    let target = process.env.target;
    if(process.env.target) commands.push(`-target=${target}`);
    execution.internalProcess('terraform', commands,`${__dirname}/environments/${ENV}/`)
});

desc('Only use when you need deploy terraform resources');
task('apply', () => {
    let commands = ['plan'];
    let target = process.env.target;
    if(process.env.target) commands.push(`-target=${target}`)
    execution.internalProcess('terraform', ['apply'],`${__dirname}/environments/${ENV}/`)
});

desc('Only use when you need destroy terraform resources');
task('destroy',async () => {
    let commands = ['plan'];
    let target = process.env.target;
    if(process.env.target) commands.push(`-target=${target}`)
    execution.internalProcess('terraform', commands,`${__dirname}/environments/${ENV}/`)
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/common`);
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/templates`);
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/keys`);
});

desc('Add new modules in terrafile.js');
task('add-module', async () => {
    await addModuleToTerrafile.addModules();
});