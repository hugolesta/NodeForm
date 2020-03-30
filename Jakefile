let { task, desk} = require('jake');
const tfenv = require('./utils/tfenv');


desc('This is the default tak');
task('default', () =>{
    console.log('This is the default task.');
})

desc('Install tfenv in this S.O if isnt exists');
task('install-tfenv', async () => {
    await tfenv.installTfEnv();

});