#FROM node:latest
FROM ubuntu
RUN apt-get update
RUN apt-get -y install imagemagick libmagick++-dev node-gyp curl
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
RUN export PATH=$PATH:/opt/ImageMagick/bin
RUN npm install --global nodemon
WORKDIR /app
