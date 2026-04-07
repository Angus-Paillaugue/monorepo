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
