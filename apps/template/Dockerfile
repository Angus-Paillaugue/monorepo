FROM oven/bun:1.3.1-alpine AS base
WORKDIR /app

FROM base AS prepare
RUN bun install -g turbo@2.8.21 && turbo telemetry disable
COPY . .
RUN turbo prune template --docker

FROM prepare AS builder
COPY --from=prepare /app/out/json/ .
RUN bun install
COPY --from=prepare /app/out/full/ .
RUN turbo build

FROM base AS release
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/apps/template/package.json .
COPY --from=builder /app/apps/template/build build/
COPY --from=builder /app/apps/template/entrypoint.sh ./entrypoint.sh
USER bun
EXPOSE 4173
CMD [ "sh", "./entrypoint.sh" ]
