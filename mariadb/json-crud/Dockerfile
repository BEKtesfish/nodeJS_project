FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER node
CMD ["npm","start"]