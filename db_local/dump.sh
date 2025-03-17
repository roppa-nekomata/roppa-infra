#!/usr/bin/env bash
THIS_DIR=$(cd "$(dirname "$0")"; pwd)

mkdir -p "${THIS_DIR}/mysqldump-async/dumps"

docker run -v "${THIS_DIR}/mysqldump-async/info.js:/usr/src/app/info.js" -v "${THIS_DIR}/mysqldump-async/dumps/:/usr/src/app/dumps/" --net=host -it y1sh/mysqldump-async:latest