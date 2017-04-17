# customer_web

> e-commerce web frontend.

## Setup
The application reads backend Rest API URL and other configuration parameters such as Google client Id from the host's operating system envirnoment. Please check [`config/prod.env.js`](./config/prod.env.js) for all environment variable names. Replace them in [dev.env.js](config/dev.env.js) if you want specify a different value in develop environment.

Some enviornment variable names are:

* `REST_API_URL`: the rest api URL in a syntax (in any *nix OS) of export `export REST_API_URL='"http://192.168.1.7"'`. The actually url is quoated by a pair of double quotes and a pair of single quotes.
* `GOOGLE_CLIENT_ID`: a string of the Google authentication client id. An example is `export GOOGLE_CLIENT_ID='"whatevergoogleclientidstring"'`. Again, the string is quoated by a pair of double quotes and a pair of single quotes.
* `FACEBOOK_APP_ID`: The Facebook app id. An example is `export FACEBOOK_APP_ID='"whateverfacebookappidstring"'`. Again, the string is quoated by a pair of double quotes and a pair of single quotes.
* `FACEBOOK_LOCAL_APP_ID`: The Facebook app id for local development which should accept `localhost:8080` for url. An example is `export FACEBOOK_LOCAL_APP_ID='"whateverfacebookappidstring"'`. Again, the string is quoated by a pair of double quotes and a pair of single quotes.

## Build and Run

``` bash
yarn
yarn run dev
```
