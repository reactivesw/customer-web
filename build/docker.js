/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Alan Zhang @zcfan

  Build docker image
*/

require('shelljs/global')
var path = require('path')
var config = require('../config')
var ora = require('ora')

var spinner = ora('building docker image...')
spinner.start()

// copy and rename generated index.html to index.ejs
var assetsPath = config.build.assetsRoot
var dockerPath = path.resolve(__dirname, '../docker')
var dockerClientPath = path.resolve(dockerPath, './client')
rm('-rf', dockerClientPath)
mkdir('-p', dockerClientPath)
cp('-R', path.resolve(assetsPath, '*'), dockerClientPath)
mv(path.resolve(dockerClientPath, 'index.html'), path.resolve(dockerClientPath, 'index.ejs'))

// run docker command to build docker image
var exec = require('child_process').exec;
exec("docker build -t customer_web .", {
  cwd: dockerPath
}, (error, stdout, stderr) => {
  spinner.stop()
  if (error) {
    console.error(`Error when building docker image: ${error}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
  console.log(`Stderr: ${stderr}`);
});