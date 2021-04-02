FROM node:12.18.4

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN yarn install

COPY . .

ENV ATLAS_URI=root
ENV NODE_ENV='production'

EXPOSE 8000

CMD [ "yarn", "start" ]