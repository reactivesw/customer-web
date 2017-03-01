module.exports = {
  NODE_ENV: '"production"',
  RS_API_URL: `"${process.env.API_SERVER}"` || '"http://localhost:8088/"', // TODO: make this read from env variable from production server
  GOOGLE_CLIENT_ID: '"131564184321-8o7d2rtmansr22v7hlubvjkqmqgkd08h.apps.googleusercontent.com"'
}
