FROM node:14-alpine

RUN npm install -g yarn --force

COPY . /var/app

WORKDIR /var/app

RUN yarn install

EXPOSE 9000
CMD [ "yarn", "start" ]