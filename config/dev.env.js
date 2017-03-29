var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var osEnv = require('./os.env')

module.exports = merge(
  prodEnv,
  osEnv,
  {
    NODE_ENV: '"development"'
  })
