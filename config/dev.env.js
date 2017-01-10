var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RS_API_URL: '"http://localhost:8088/"',
  GOOGLE_CLIENT_ID: '"131564184321-8o7d2rtmansr22v7hlubvjkqmqgkd08h.apps.googleusercontent.com"'
})
