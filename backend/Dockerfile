FROM node:12.18.4

WORKDIR /usr/src/app

COPY ./package*.json ./


RUN yarn install

COPY . .

EXPOSE 8000

CMD [ "yarn", "start" ]