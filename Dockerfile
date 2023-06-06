ARG NODE_VERSION=13.12.0
ARG SENTRY_AUTH_TOKEN

FROM google/cloud-sdk:296.0.1-alpine AS translations
COPY hack/update-translations.sh /update-translations.sh
RUN /update-translations.sh

FROM mhart/alpine-node:${NODE_VERSION} AS builder
RUN apk add --no-cache make gcc g++ python
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
COPY package.json .
COPY package-lock.json .
RUN npm ci --prod
COPY generated generated
COPY .env .
COPY jsconfig.json .
COPY tsconfig.json .
COPY tsconfig.server.json .
COPY tsconfig.server.prod.json .
COPY next-env.d.ts .
COPY next.config.js .
COPY public public
COPY --from=translations /public/static/locales public/static/locales
COPY server server
COPY src src
COPY types types
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN:-}
RUN npm run build

FROM google/cloud-sdk:296.0.1-alpine AS cdn
WORKDIR /app
COPY hack/upload-static-content.sh /upload-static-content.sh
COPY --from=builder /app .
RUN /upload-static-content.sh

FROM mhart/alpine-node:slim-${NODE_VERSION}
RUN apk add --no-cache tini
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PATH="$PATH:/app/node_modules/.bin"
ENV TS_NODE_PROJECT=tsconfig.server.prod.json
COPY --from=builder /app .
RUN ln -s /config/.env ./.env.local
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "-r", "tsconfig-paths/register", "dist/server/index.js"]
EXPOSE 3000
