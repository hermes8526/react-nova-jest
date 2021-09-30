FROM node:16.8.0 AS builder

ENV NODE_ENV=production
ENV PUBLIC_URL=/

WORKDIR /build

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build


FROM node:16.8.0-alpine

EXPOSE 8080

WORKDIR /usr/src/app
COPY docker-entrypoint.sh package.json package-lock.json .
COPY --from=builder /build/build build
RUN npm install -g serve

USER node

ENTRYPOINT ["/bin/sh"]
CMD ["docker-entrypoint.sh"]

