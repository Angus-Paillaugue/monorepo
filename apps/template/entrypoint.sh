#!/usr/bin/env bash
# This is the entrypoint script for the web docker container. It is responsible for running the production server.

set -e

# Launch prod server
bun --bun run build/index.js
