FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./


RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run server" ]