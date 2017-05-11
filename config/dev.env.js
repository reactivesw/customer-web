var prodEnv = require('./prod.env')

module.exports = Object.assign({}, prodEnv, {
  NODE_ENV: '"development"',

  HTTP_TIMEOUT: '10000', // Make timeout longer for development env

  REST_API_URL: '"/api/"', // api proxying during development: http://vuejs-templates.github.io/webpack/proxy.html
  FACEBOOK_APP_ID: process.env.FACEBOOK_LOCAL_APP_ID
})
