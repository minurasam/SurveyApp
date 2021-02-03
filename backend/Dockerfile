FROM node:12.18.4

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./


RUN yarn install

COPY index.d.ts ./node_modules/@types/mongoose/
COPY . .
RUN npm run build

FROM base
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY --from=builder /app/dist ./
RUN npm install --only=production
EXPOSE 8000
CMD ["index.js"]