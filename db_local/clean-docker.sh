#!/usr/bin/env bash

CONTAINER=mariadb-local
RUNNING=$(docker inspect --format="{{ .State.Running }}" $CONTAINER 2> /dev/null)

if [ $? -eq 0 ]; then
  docker rm ${CONTAINER} --force
fi

trap "exit 0" SIGHUP SIGINT SIGTERM
