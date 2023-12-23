FROM node:20.9.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .yarn .yarn
COPY .yarnrc.yml package.json yarn.lock* ./
RUN yarn install --immutable

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM keymetrics/pm2:latest-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public* ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["pm2-runtime", "start", "server.js", "--env", "production", "--watch", "--name", "presso.codes"]
