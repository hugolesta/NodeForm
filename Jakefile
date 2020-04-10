let { task, desc} = require('jake');
const tfenv = require('./utils/tfenv');
const environments = require('./utils/environments');
const modules = require('./utils/terraform_modules');
const symlink = require('./utils/symlinks');
const execution = require('./utils/commandExecution');
const addModuleToTerrafile = require('./utils/addModules');
const manageCredentials = require('./utils/creadentialsParser');
const glob = require('glob');


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
    const ENV =  process.env.env;
    if(!ENV) throw Error("You must to add a env parameter: for example jake ENV=dev stack=ec2");
    let modulesPath = `./environments/${ENV}/modules`;
    let stack = process.env.stack;
    if(!stack) throw Error("You must to add stack parameter and one value: : for example jake ENV=dev stack=ec2");
    
    await environments.createEnvironmentFolder(ENV);
    await modules.createModulesDirectory(ENV);
    await modules.deleteModulesCache(modulesPath);
    await modules.resolveTerrafileDependencies(modulesPath);
    await execution.internalProcess('terraform', ['get'],`${__dirname}/environments/${ENV}/`)
});

desc('Use init after run the get task')
task('init', async () => {

    const ENV =  process.env.env;
    if(!ENV) throw Error("You must to add a env parameter: for example jake ENV=dev stack=ec2");
    let modulesPath = `./environments/${ENV}/modules`;
    let stack = process.env.stack;
    if(!stack) throw Error("You must to add stack parameter and one value: : for example jake ENV=dev stack=ec2");

    await glob(`${__dirname}/common/*.tf`, {}, async (err, files)=>{
        await files.map(file =>{
            fileName = file.split('/');
            symlink.prepareSymlink(file,`${__dirname}/environments/${ENV}/common/${fileName[fileName.length -1]}`);
        });
    });

    await symlink.prepareSymlink(`${__dirname}/templates`,`${__dirname}/environments/${ENV}/templates`);
    await symlink.prepareSymlink(`${__dirname}/keys`,`${__dirname}/environments/${ENV}/keys`);
    await execution.internalProcess('terraform', ['init'],`${__dirname}/environments/${ENV}/`);

});

desc('Only use when you need check terraform resources');
task('plan',async () => {

    const ENV =  process.env.env;
    if(!ENV) throw Error("You must to add a env parameter: for example jake ENV=dev stack=ec2");
    let modulesPath = `./environments/${ENV}/modules`;
    let stack = process.env.stack;
    if(!stack) throw Error("You must to add stack parameter and one value: : for example jake ENV=dev stack=ec2");

    let commands = ['plan'];
    let target = process.env.target;
    if(target) commands.push(`-target=${target}`);
    await execution.internalProcess('terraform', commands,`${__dirname}/environments/${ENV}/`)
});

desc('Only use when you need deploy terraform resources');
task('apply', async () => {

    const ENV =  process.env.env;
    if(!ENV) throw Error("You must to add a env parameter: for example jake ENV=dev stack=ec2");
    let modulesPath = `./environments/${ENV}/modules`;
    let stack = process.env.stack;
    if(!stack) throw Error("You must to add stack parameter and one value: : for example jake ENV=dev stack=ec2");

    let commands = ['apply'];
    let target = process.env.target;
    let autoApprove = process.env.autoApprove;
    if(target) commands.push(`-target=${target}`);
    if(autoApprove === `true`) commands.push(`-auto-approve`);
    await execution.internalProcess('terraform', commands,`${__dirname}/environments/${ENV}/`)
});

desc('Only use when you need destroy terraform resources');
task('destroy',async () => {

    const ENV =  process.env.env;
    if(!ENV) throw Error("You must to add a env parameter: for example jake ENV=dev stack=ec2");
    let modulesPath = `./environments/${ENV}/modules`;
    let stack = process.env.stack;
    if(!stack) throw Error("You must to add stack parameter and one value: : for example jake ENV=dev stack=ec2");

    let commands = ['destroy'];
    let target = process.env.target;
    let autoApprove = process.env.autoApprove;
    if(target) commands.push(`-target=${target}`);
    if(autoApprove === `true`) commands.push(`-auto-approve`);
    await execution.internalProcess('terraform', commands,`${__dirname}/environments/${ENV}/`)
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/common`);
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/templates`);
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/keys`);
});

desc('Add new modules in terrafile.js');
task('add-module', async () => {
    await addModuleToTerrafile.addModules();
});

desc('Manage your aws credentials');
task('manage-credentials', async () => {
    await manageCredentials.execute();
});