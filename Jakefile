let { task, desk} = require('jake');
const tfenv = require('./utils/tfenv');


desc('This is the default tak');
task('default', () =>{
    console.log('This is the default task.');
})

desc('Install tfenv in this S.O if it exists');
task('install-tfenv', async () => {
    await tfenv.checkIfTfenvWasInstalled() ? console.log("tfenv is already installed") : console.log("tfenv is not installed in your S.O");
});