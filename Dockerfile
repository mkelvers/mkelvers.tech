FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM node:lts-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts
COPY --from=build /app/build ./build
USER node
EXPOSE 3000
CMD ["node", "build"]
