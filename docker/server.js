/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Alan Zhang @zcfan

  This server meant to change api server address dynamically even after the Vue SPA bundled.
  I think the better way is just make sure api server is "example.com/api", then let the reverse proxy server handle it...
*/

var path = require('path')
var express = require('express')
var ejs = require('ejs')
var app = express()

// use ejs template engine because it syntax is addition of html, which we can modify from webpack generated.
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'client'))

app.use(express.static('./client'))
app.use('/', function (req, res) {
  res.render('index', { apiServerAddr: process.env.API_SERVER_ADDR })
})

app.listen(3000, function () {
  console.log('customer_web started!')
})
