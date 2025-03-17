#!/usr/bin/env bash

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
COMMIT_ID=$(git rev-parse --short HEAD)

TAG_NAME="${BRANCH_NAME}_${COMMIT_ID}"

# Clean up
./clean-docker.sh

# Build
docker build --no-cache --tag=y1sh/roppa-db_local:$TAG_NAME . \
  && docker push y1sh/roppa-db_local:$TAG_NAME