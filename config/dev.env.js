var prodEnv = require('./prod.env')

module.exports = Object.assign(prodEnv, {
  NODE_ENV: '"development"',

  FACEBOOK_APP_ID: process.env.FACEBOOK_LOCAL_APP_ID
})
