# Deploy

Process of deployment:

1. Use webpack bundle project.
2. Build docker image.
3. push docker image to docker hub.
4. deploy docker image to Kubernetes(Google Container Engine).

## Bundle Project

```bash
npm run build
```

This command will put bundled static file to `/dist` folder.

## Build Docker image

```bash
npm run docker
```

This command will copy all files from `/build/docker` to `/dist`.

`server.js` and `package.json` make `/dist` folder a npm project has a simple www server.

`Dockerfile` instruct docker cli build the image based on official node:6.10.0 image.

## Push to docker hub.

Use docker cli to push image built in last step to docker hub.

```bash
docker login --username="$DOCKER_USERNAME" --password="$DOCKER_PASSWORD";
docker push reactivesw/customer-web;
```

## Deploy to Kubernetes

`/build/deploy/deploy.sh` will deploy docker to Kubernetes.

`/build/deploy/k8s_deployment.yaml` tells `deploy.sh` how to config customer-web pod.

`/build/deploy/k8s_service.yaml` isn't been used by deploy.sh, cause it'll recreate customer-web service, which change public ip of www server. But it contains configuration for manually create the customer-web service, if a new service is what we want. 

## CI

`.travis.yml` config file instruct Travis CI to deploy this project.

It will run all previous steps automatically.
