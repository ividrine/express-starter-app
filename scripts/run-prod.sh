#!/usr/bin/env bash
export NODE_ENV=production
node --import ./dist/config/instrumentation.js dist/index.js
