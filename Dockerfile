FROM node:16.15-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

COPY ./src ./src
COPY ./public ./public
COPY ./next.config.js .
COPY ./tsconfig.json .

ENV NODE_ENV=production

RUN yarn build

FROM node:16.15-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NODE_ENV=production

CMD ["node", "server.js"]
