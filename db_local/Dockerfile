FROM mariadb:11.4.5

LABEL maintainer="linus@andromedarabbit.net"

ENV MYSQL_ROOT_PASSWORD r00t!
ENV MYSQL_DATABASE roppa
ENV MYSQL_USER roppa
ENV MYSQL_PASSWORD r0ppa!

COPY build-resources/ /etc/mysql/conf.d/
COPY mysqldump-async/dumps/ /docker-entrypoint-initdb.d/
