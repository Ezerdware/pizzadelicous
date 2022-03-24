FROM node:alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm i sqlite3@5.0.0
EXPOSE 3000
CMD ["node", "server.js"]