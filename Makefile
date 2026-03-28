.PHONY: help dev build docker-preview docker-build docker-push docker-release docker-clean

DOCKER_REGISTRY ?= docker.io/myusername
APP_NAME ?= my-app
VERSION ?= latest
PLATFORM ?= linux/amd64,linux/arm64

help:
    @echo "Available commands:"
    @echo "  make dev                  - Start dev server (Turborepo)"
    @echo "  make build                - Build all (Turborepo)"
    @echo "  make docker-preview       - Preview Docker locally with compose"
    @echo "  make docker-build         - Build Docker image"
    @echo "  make docker-push          - Push to registry"
    @echo "  make docker-release       - Build + Push (full pipeline)"
    @echo ""
    @echo "Usage: VERSION=1.0.0 DOCKER_REGISTRY=docker.io/user make docker-release"

dev:
    turbo run dev

build:
    turbo run build

docker-preview:
    docker compose up --build

docker-build:
    docker buildx build \
        --platform $(PLATFORM) \
        -t $(DOCKER_REGISTRY)/$(APP_NAME):$(VERSION) \
        -f apps/template/Dockerfile \
        . \
        $(EXTRA_BUILD_ARGS)

docker-push: docker-build
    docker push $(DOCKER_REGISTRY)/$(APP_NAME):$(VERSION)

docker-release: docker-push
    @echo "✓ Released $(DOCKER_REGISTRY)/$(APP_NAME):$(VERSION)"

docker-clean:
    docker system prune -af --volumes

.DEFAULT_GOAL := help
