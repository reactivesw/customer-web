// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

// bundle with webpack
webpack(webpackConfig, function (err, stats) {
  // build docker image after bundled
  var exec = require('child_process').exec;
  exec("docker build -t customer_web .", {
    cwd: path.resolve(config.build.assetsRoot, '../')
  }, (error, stdout, stderr) => {
    // docker logs
    console.log('\n\n=========== Docker image building output ===========')
    if (error) {
      console.error(`Error when building docker image: ${error}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    console.log(`Stderr: ${stderr}`);
    console.log('====================================================\n')

    // webpack logs
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  });
})
