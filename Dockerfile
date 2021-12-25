FROM node:16.13-alpine AS build-env
WORKDIR /shazagram
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build

FROM node:16.13-alpine AS clean-env
COPY --from=build-env /shazagram/dist /shazagram
COPY --from=build-env /shazagram/package*.json /shazagram/
WORKDIR /shazagram
RUN yarn install --production 

FROM ubuntu:20.04
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG TELEGRAM_API_TOKEN
ENV TELEGRAM_API_TOKEN $TELEGRAM_API_TOKEN

ARG API_URL
ENV API_URL $API_URL

ARG SENTRY_DSN
ENV SENTRY_DSN $SENTRY_DSN

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

RUN apt-get update && \
  apt-get install -y software-properties-common && \
  apt-add-repository ppa:marin-m/songrec -y && \
  apt-get install -y \
  curl \
  songrec \
  ffmpeg && \
  curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
  apt-get install -y nodejs

COPY --from=clean-env /shazagram /shazagram
CMD ["node", "shazagram/app.js"]