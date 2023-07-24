FROM node:20.2.0

COPY . /app
WORKDIR /app

RUN yarn set version berry
RUN yarn global add pm2
RUN yarn install

RUN npm run build
CMD ["pm2-runtime", "start", "npm", "--", "start"]
