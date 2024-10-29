FROM node:lts-alpine
WORKDIR /usr/src/app

COPY . ./
RUN npm ci
RUN npm build

EXPOSE 8080
CMD ["npm", "start"]