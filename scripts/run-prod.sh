#!/usr/bin/env bash
export NODE_ENV=production
prisma migrate deploy
node --import ./dist/config/instrumentation.js dist/index.js
