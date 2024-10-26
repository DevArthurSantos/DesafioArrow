FROM node:alpine

WORKDIR /usr/src/api

COPY . .

COPY ./.env.prod ./.env

RUN apk add yarn 

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]
