# Dockerfile for React client

# Build react client
FROM node:14-slim

# Working directory be app
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY . .
###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

ENV ATLAS_URI=http://localhost:8000/


CMD ["npm","start"]

