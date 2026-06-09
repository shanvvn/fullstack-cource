FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV DEBUG=todo-app:*

USER node

CMD npm start
