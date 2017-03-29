# customer_web

> e-commerce web frontend.

## Setup
The application reads backend Rest API URL and other configuration parameters such as Google client Id from the host's operating system envirnoment. Please check [`config/os.env.js`](./config/os.env.js) for all environment variable names.

Some enviornment variable names are:

* `REST_API_URL`: the rest api URL in a syntax (in any *nix OS) of export `export REST_API_URL='"http://192.168.1.7"'`. The actually url is quoated by a pair of double quotes and a pair of single quotes.
* `GOOGLE_CLIENT_ID`: a string of the Google authentication client id. An example is `export GOOGLE_CLIENT_ID='"whatevergoogleclientidstring"'`. Again, the string is quoated by a pair of double quotes and a pair of single quotes.

## Build and Run

``` bash
yarn
yarn run dev
```

