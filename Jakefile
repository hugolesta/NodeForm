const { task, desc} = require("jake");
const tfenv = require("./utils/tfenv");
const environments = require("./utils/environments");
const modules = require("./utils/terraform_modules");
const symlink = require("./utils/symlinks");
const execution = require("./utils/commandExecution");
const addModuleToTerrafile = require("./utils/addModules");
const manageCredentials = require("./utils/creadentialsParser");
const ask = require("./utils/ask");
const glob = require("glob");
const config = require("./utils/config");

desc("Install tfenv in this S.O if isnt exists");
task("install-tfenv", async () => {
    await tfenv.installTfEnv();
});

desc("Create your environment folder and resolve terrafile");
task("get", async () => {
    let ENV =  process.env.ENV;
    if(!ENV) await ask.askForEnv();
    let STACK = process.env.STACK;
    if(!STACK) await ask.askForStack();
    let modulesPath = `./environments/${ENV}/modules`;
    
    await environments.createEnvironmentFolder(ENV,STACK);
    await modules.createModulesDirectory(ENV);
    await modules.deleteModulesCache(modulesPath);
    await modules.resolveTerrafileDependencies(modulesPath);
    await execution.internalProcess("terraform", ["get"],`${__dirname}/environments/${ENV}/`)
});

desc("Use init after run the get task")
task("init", async () => {

    let ENV =  process.env.ENV;
    if(!ENV) await ask.askForEnv();
    let STACK = process.env.STACK;
    if(!STACK) await ask.askForStack();

    await glob(`${__dirname}/${config.sharedFolder}/*.tf`, {}, async (err, files)=> {
        await files.map(file => {
            const fileName = file.split("/");
            symlink.prepareSymlink(file,`${__dirname}/environments/${ENV}/${process.env.STACK}/${fileName[fileName.length -1]}`);
            symlink.prepareSymlink(file,`${__dirname}/environments/${ENV}/vpc/${fileName[fileName.length -1]}`);
        });
    });

    await symlink.prepareSymlink(`${__dirname}/${config.sharedFolder}/vpc/aws`,`${__dirname}/environments/${ENV}/vpc`);
    await symlink.prepareSymlink(`${__dirname}/templates`,`${__dirname}/environments/${ENV}/templates`);
    await symlink.prepareSymlink(`${__dirname}/keys`,`${__dirname}/environments/${ENV}/keys`);
    await execution.internalProcess("terraform", ["init"],`${__dirname}/environments/${ENV}/${STACK}`);

});

desc("Only use when you need to check terraform resources status.");
task("plan",async () => {

    let ENV =  process.env.ENV;
    if(!ENV) await ask.askForEnv();
    let STACK = process.env.STACK;
    if(!STACK) await ask.askForStack();

    let commands = ["plan"];
    let target = process.env.target;
    if(target) commands.push(`-target=${target}`);
    await execution.internalProcess("terraform", commands,`${__dirname}/environments/${ENV}/${STACK}`)
});

desc("Only use when you need deploy terraform resources");
task("apply", async () => {
    let ENV =  process.env.ENV;
    if(!ENV) await ask.askForEnv();
    let STACK = process.env.STACK;
    if(!STACK) await ask.askForStack();

    let commands = ["apply"];
    let target = process.env.target;
    let autoApprove = process.env.autoApprove;
    if(target) commands.push(`-target=${target}`);
    if(autoApprove === `true`) commands.push(`-auto-approve`);
    await execution.internalProcess("terraform", commands,`${__dirname}/environments/${ENV}/${STACK}`)
});

desc("Only use when you need destroy terraform resources");
task("destroy",async () => {

    let ENV =  process.env.ENV;
    if(!ENV) await ask.askForEnv();
    let STACK = process.env.STACK;
    if(!STACK) await ask.askForStack();

    let commands = ["destroy"];
    let target = process.env.target;
    let autoApprove = process.env.autoApprove;
    if(target) commands.push(`-target=${target}`);
    if(autoApprove === `true`) commands.push(`-auto-approve`);
    await execution.internalProcess("terraform", commands,`${__dirname}/environments/${ENV}/`)
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/${config.sharedFolder}`);
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/templates`);
    await symlink.removeSymlink(`${__dirname}/environments/${ENV}/keys`);
});

desc("Add new modules in terrafile.json, you shall use it in your projects.");
task("add-module", async () => {
    await addModuleToTerrafile.addModules();
});

desc("Manage your aws credentials, select some profile and use it.");
task("manage-credentials", async () => {
    await manageCredentials.execute();
});

desc("Check what profile you have selected at this moment.");
task("show-selected-credentials", async () => {
    await manageCredentials.checkProfile();
});