var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RS_API_URL: '"http://localhost:8088/"',
  GOOGLE_CLIENT_ID: '"49231344031-7ce6vku3skeurlfpn7ucmgu2io1aol8h.apps.googleusercontent.com"'
})
