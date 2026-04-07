ARG BUN_VERSION=1.3.1
ARG TARGET=template

FROM oven/bun:${BUN_VERSION}-alpine AS base
WORKDIR /app

FROM base AS prepare
WORKDIR /app/monorepo
ARG TURBO_VERSION=2.8.21
RUN bun install -g turbo@${TURBO_VERSION} && turbo telemetry disable
COPY . .
ARG TARGET
RUN turbo prune ${TARGET} --docker

FROM prepare AS builder
WORKDIR /app/monorepo
COPY --from=prepare /app/monorepo/out/json/ .
RUN bun install
COPY --from=prepare /app/monorepo/out/full/ .
RUN turbo build

FROM base AS release
WORKDIR /app
ENV NODE_ENV=production
ARG TARGET
COPY --from=builder /app/monorepo/node_modules node_modules
COPY --from=builder /app/monorepo/apps/${TARGET}/package.json .
COPY --from=builder /app/monorepo/apps/${TARGET}/build build/
COPY --from=builder /app/monorepo/apps/${TARGET}/entrypoint.sh ./entrypoint.sh
USER bun
EXPOSE 3000
CMD [ "sh", "./entrypoint.sh" ]
