FROM node:20.2.0

COPY . /app

RUN yarn global add pm2

WORKDIR /app

RUN yarn set version berry
RUN yarn install

RUN yarn build
CMD ["pm2-runtime", "start", "npm", "--", "start"]
