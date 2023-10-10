FROM node:12.5.0
RUN echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list
RUN apt-get update && apt-get install -y ca-certificates curl  && rm -rf /var/lib/apt/lists/* 

# replace this with your application's default port
# EXPOSE 8080

RUN mkdir /home/node/app/

COPY .npmrc /home/node/app
COPY package.json /home/node/app
COPY package-lock.json /home/node/app
WORKDIR /home/node/app
ENV CI=true
ARG LOCATION
ARG NPM_TOKEN
ARG NEXUS_NPM_TOKEN
ARG BASE_PATH
RUN npm install  --no-progress --ignore-optional --quiet

COPY . /home/node/app
