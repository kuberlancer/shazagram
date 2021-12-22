FROM node:16.13-alpine as build-env
WORKDIR /shazagram
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
RUN yarn build

FROM node:16.13-alpine as clean-env
COPY --from=build-env /shazagram/dist /shazagram
COPY --from=build-env /shazagram/package*.json /shazagram/
WORKDIR /shazagram
RUN yarn install --production 

FROM gcr.io/distroless/nodejs:16

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

COPY --from=clean-env /shazagram /shazagram
WORKDIR /shazagram
ENTRYPOINT ["/nodejs/bin/node", "app.js"]