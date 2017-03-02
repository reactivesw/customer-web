var injectApiSnippet = require('./inject-api-snippet.js')
var merge = require('webpack-merge')
var prodWebpackConfig = require('./webpack.prod.conf')

// inject snippet for dynamiclly change api server address using server environment variable
var webpackConfig = merge(prodWebpackConfig, {
  plugins: [
    new injectApiSnippet()
  ]
})

module.exports = webpackConfig
