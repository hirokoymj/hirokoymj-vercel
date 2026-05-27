# Publish Docker Package

- [Publish Docker Package](#publish-docker-package)
  - [Overview](#overview)
  - [Output](#output)
  - [Docker Actions Used](#docker-actions-used)
  - [Docker commands](#docker-commands)
    - [Login to GitHub Container Registry](#login-to-github-container-registry)
    - [Build an image](#build-an-image)
    - [Push an image to the registry](#push-an-image-to-the-registry)
    - [Pull an image from the registry](#pull-an-image-from-the-registry)
    - [Run a container locally](#run-a-container-locally)
    - [List local images](#list-local-images)
    - [List running containers](#list-running-containers)
  - [References](#references)

## Overview

- The workflow [docker-publish.yml](.github/workflows/docker-publish.yml) allows to setup automation to publish 🐳 Docker images to GitHub Container Registry (`ghcr.io`).

## Output

- GitHub Package: https://github.com/hirokoymj/hirokoymj-vercel/pkgs/container/hirokoymj-vercel
- Docker image: `docker pull ghcr.io/hirokoymj/hirokoymj-vercel:main`

## Docker Actions Used

| Action                        | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| `docker/login-action@v3`      | Authenticates to `ghcr.io` using `GITHUB_TOKEN`            |
| `docker/metadata-action@v5`   | Generates image tags and labels from Git branch/tag        |
| `docker/build-push-action@v5` | Builds the image from `Dockerfile` and pushes to `ghcr.io` |

## Docker commands

> Requires Docker Desktop running locally.

### Login to GitHub Container Registry

```bash
docker login ghcr.io -u <github-username>

## % docker login ghcr.io -u hirokoymj
## Password: ===> Enter GitHub Access Token (PAT), not GitHub account password.
## Login Succeeded
```

### Build an image

```bash
docker build -t ghcr.io/hirokoymj/hirokoymj-vercel:main .
```

### Push an image to the registry

```bash
docker push ghcr.io/hirokoymj/hirokoymj-vercel:main
```

### Pull an image from the registry

```bash
docker pull ghcr.io/hirokoymj/hirokoymj-vercel:main
```

### Run a container locally

```bash
docker run -p 8080:80 ghcr.io/hirokoymj/hirokoymj-vercel:main
```

Then open http://localhost:8080 in a browser.

### List local images

```bash
docker images

#% docker build -t ghcr.io/hirokoymj/hirokoymj-vercel:main .
#% docker images

IMAGE                                      ID             DISK USAGE   CONTENT SIZE   EXTRA
ghcr.io/hirokoymj/hirokoymj-vercel:main    7a5a1f6c7d45        181MB             0B
hirokoymj-vercel:latest                    c1f2af8f0f78        181MB             0B    U
```

### List running containers

```bash
docker ps
```

---

## References

- [Exercise: Publish Docker Packages](https://github.com/hirokoymj/skills-publish-docker-images/issues/1)
- https://docs.docker.com/reference/cli/docker/image/ls/
-
