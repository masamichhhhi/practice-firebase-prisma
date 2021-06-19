FROM node:12-alpine

ARG FIREBASE_PROJECT
ARG FIREBASE_TOKEN

RUN apt-get update && \
  npm install -g firebase-tools

WORKDIR /app

COPY ["./firebase.json", "./"]

RUN firebase use ${FIREBASE_PROJECT} --token ${FIREBASE_TOKEN}

WORKDIR /app/functions

COPY ["./functions/package.json", "./functions/package-lock.json", "./"]

RUN npm install

EXPOSE 4000 5000 5001