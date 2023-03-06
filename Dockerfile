FROM node:18-alpine3.17 as development
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
ENV SERVER_PORT 3000
EXPOSE $SERVER_PORT
CMD ["node", "/dist/main.js"]