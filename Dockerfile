# Stage 1: Base Environment
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV APP_DIR=/usr/local/app
RUN corepack enable

# Stage 2: Install all dependencies, generate prisma client and dist folder
FROM base AS build
WORKDIR $APP_DIR
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Stage 3: Final
FROM base
WORKDIR $APP_DIR
COPY package.json pnpm-lock.yaml ./
COPY scripts/run-prod.sh ./scripts/
RUN pnpm install --prod --frozen-lockfile && \
    rm -rf /pnpm/store
COPY --from=build $APP_DIR/dist ./dist
COPY --from=build $APP_DIR/node_modules/.prisma ./node_modules/.prisma
EXPOSE 8080
CMD ["pnpm", "prod"]