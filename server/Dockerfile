FROM node:22-bullseye-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma ./prisma
RUN pnpm prisma generate

COPY . .
RUN pnpm run build

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma/client ./prisma/client

COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/node_modules ./node_modules

USER 1000

EXPOSE 3333

CMD ["dist/index.js"]
