FROM node:20.9-slim as build
ARG ENV_FILE
COPY ./ /app
WORKDIR /app
RUN set -xe; \
  yarn install --pure-lockfile; \
  yarn build

FROM node:20.9-slim as serve
COPY --from=build /app/.output /app/.output

EXPOSE 3000

WORKDIR /

# Pretty sure these don't actually work...
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Run in production mode
ENV NODE_ENV=production

ENTRYPOINT ["node", "/app/.output/server/index.mjs"]