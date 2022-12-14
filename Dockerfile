FROM node:14-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

EXPOSE 8080
CMD ["npx", "nodemon", "index.ts"]