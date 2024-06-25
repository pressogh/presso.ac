FROM --platform=$BUILDPLATFORM node:20.9.0-alpine AS base

ARG NEXT_PUBLIC_API_URL
ARG RESUME_BUCKET_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV RESUME_BUCKET_URL=$RESUME_BUCKET_URL

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .yarn ./.yarn
COPY .pnp.cjs .pnp.loader.mjs .yarnrc.yml package.json yarn.lock* ./

RUN yarn install --immutable

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/.yarn ./.yarn
COPY --from=deps /app/.pnp.cjs ./pnp.cjs
COPY --from=deps /app/.pnp.loader.mjs ./pnp.loader.mjs

COPY . .

RUN yarn build

FROM base AS runner

LABEL email="caff1nepill@gmail.com"
LABEL name="presso"

RUN yarn global add pm2
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/.pnp.cjs /app/.pnp.loader.mjs /app/.yarnrc.yml ./

COPY --from=builder /app/public* ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

RUN rm -rf .yarn

COPY --from=deps /app/.yarn ./yarn

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=3000
ENV HOSTNAME=presso.ac
EXPOSE 3000

ENTRYPOINT ["pm2-runtime", "start", "server.js", "--node-args", "-r ./.pnp.cjs", "--env", "production", "--watch", "--name", "presso.ac"]
