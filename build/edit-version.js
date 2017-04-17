var yaml = require('js-yaml')
var fs = require('fs')
var path = require('path')
var version = process.argv
var package = require( '../package.json' )

var k8sPath = path.resolve( __dirname, 'deploy/k8s_deployment.yaml' )
var packagePath = path.resolve( __dirname, '../package.json' )

// Check version string is provided, it should be the third argument
if ( process.argv.length < 3 ) {
  // 9 is Invalid Argument: https://nodejs.org/api/process.html#process_exit_codes
  process.exit(9)
}
var version = process.argv[2]

// Edit version in k8s.yaml
try {
  var k8s = yaml.load( fs.readFileSync( k8sPath, 'utf8' ) )
  k8s.spec.template.spec.containers[0].image = 'reactivesw/' + package.name + ':' + version + '-beta'

  var k8sYamlContent = yaml.dump( k8s )
  fs.writeFile( k8sPath, k8sYamlContent)
} catch (e) {
  console.log(e)
  process.exit(1)
}

// Edit version in package.json
try {
  package.version = version;
  // give third argument to JSON.stringify() for pretty json result
  fs.writeFile( packagePath, JSON.stringify( package, null, 2 ) )
} catch (e) {
  console.log( e )
  process.exit( 1 )
}
