FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package*.json ./


RUN yarn install

COPY . .

EXPOSE 8000

CMD [ "yarn", "start" ]