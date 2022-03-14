FROM node:alpine
COPY ./app
WORKDIR /app
CMD docker images
