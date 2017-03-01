require('shelljs/global')
var path = require('path')
var ora = require('ora')

var spinner = ora('building docker image...')
spinner.start()

var exec = require('child_process').exec;
exec("docker build -t customer_web .", (error, stdout, stderr) => {
  spinner.stop()
  if (error) {
    console.error(`Error when building docker image: ${error}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
  console.log(`Stderr: ${stderr}`);
});