FROM node:alpine
COPY ./app
WORKDIR /app
CMD npm install
CMD npm test
CMD node server.js
