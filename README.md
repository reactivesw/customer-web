# customer_web

> e-commerce web frontend.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build docker image
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Design

TODO: doc modal dialog design

## Build

```
# build docker image
npm run build

# run it, bind 80 host port to 3000 container port(3000 is the port app in container listen on)
# and set API_SERVER_ADDR environment variable to set api server address which SPA use.
docker run -it --rm \
-p 80:3000 \
-e API_SERVER_ADDR='//local.dev:8088/' \
--name running_customer_web customer_web
```

API_SERVER_ADDR example:
- http://api.example.com/
- https://api.example.com/
- //api.example.com/
