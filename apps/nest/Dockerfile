# FROM oven/bun:1-alpine AS base
# WORKDIR /app

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY package.json bun.lock /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lock /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile --production --ignore-scripts

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM base AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# COPY . .
# ENV NODE_ENV=production
# RUN bun run build

# # Prod server
# FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# COPY --from=prerelease /app/package.json .
# COPY --from=prerelease /app/dist dist/
# # USER bun
# EXPOSE 3000
# CMD bun run dist/main.js




ARG BUN_VERSION=1.3.1
ARG TARGET=nest-test

FROM oven/bun:${BUN_VERSION}-alpine AS base
WORKDIR /app

FROM base AS prepare
ARG TURBO_VERSION=2.8.21
RUN bun install -g turbo@${TURBO_VERSION} && turbo telemetry disable
COPY . .
ARG TARGET
RUN turbo prune ${TARGET} --docker

FROM prepare AS builder
COPY --from=prepare /app/out/json/ .
RUN bun install
COPY --from=prepare /app/out/full/ .
RUN turbo build

FROM base AS release
WORKDIR /app
ENV NODE_ENV=production
ARG TARGET
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/apps/${TARGET}/package.json .
COPY --from=builder /app/apps/${TARGET}/build build/
EXPOSE 3000
CMD bun run dist/main.js
