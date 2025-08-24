FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:lts-alpine AS runtime

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "--enable-source-maps", "dist/index.js"]
