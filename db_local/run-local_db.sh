#!/usr/bin/env bash

# Clean up
./clean-docker.sh

# Build & Run
docker build --no-cache --tag=y1sh/roppa-db_local . \
  && docker run -d -t -p 3306:3306 --name mariadb-local y1sh/roppa-db_local:latest
