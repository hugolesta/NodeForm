let { task, desk} = require('jake');
const tfenv = require('./utils/tfenv');
const config = require('./utils/config');
const environments = require('./utils/environments');

desc('This is the default tak');
task('default', () =>{
    console.log('This is the default task.');
})

desc('Install tfenv in this S.O if isnt exists');
task('install-tfenv', async () => {
    await tfenv.installTfEnv();
});

desc('Create your environment folder <folderName>');
task('env', async (folderName) => {
    if(!folderName) console.log("You must to add a folderName argument");
    await environments.createEnvironmentFolder(folderName);
});