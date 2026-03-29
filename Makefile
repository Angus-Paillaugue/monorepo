TURBO_VERSION=2.8.21
BUN_VERSION=1.3.1

docker_dev:
	docker compose --profile $(PROFILE)_dev up

docker_prod_build:
	docker compose --profile $(PROFILE)_prod build --build-arg TARGET=$(PROFILE) --build-arg TURBO_VERSION=$(TURBO_VERSION) --build-arg BUN_VERSION=$(BUN_VERSION)

docker_prod_preview:
	docker compose --profile $(PROFILE)_prod up

docker_prod: docker_prod_build docker_prod_preview


# ---------------- DOCS ----------------
# Run dev server:
# make docker_dev PROFILE=<PROFILE_NAME>
#
# Preview production build:
# make docker_prod PROFILE=<PROFILE_NAME>
