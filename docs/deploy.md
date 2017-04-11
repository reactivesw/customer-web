# Deploy

Process of deployment:

1. Use webpack bundle project.
1. Build docker image.
1. deploy docker image to Kubernetes(Google Container Engine).

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

## Deploy to Kubernetes

`.travis.yml` config file instruct Travis CI to deploy project.

It will:

1. Bundle project.
1. Build docker image.
1. Upload docker image to DockerHub.
1. run `/build/deploy/deploy.sh` which deploy docker to Kubernetes.

`/build/deploy/k8s_deployment.yaml` tell `deploy.sh` how to config customer-web pod.
`/build/deploy/k8s_service.yaml` not been used by any script, But it contains configuration for manually create the customer-web service. 

## Other

version in `k8s_deployment.yaml` must keep sync with `package.json`. There is a npm script defined in `package.json` could help with that.
 
 ```bash
 npm run version -- <new version>
 // for instance
 // npm run version -- 0.0.4
 ```
 
 It'll change version in two files. ( Not adding git tag like `npm version` )
