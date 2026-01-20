<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">

[![codecov][codecov-badge]][codecov-url]

   <h3 align="center">Express Starter App</h3>

  <p align="center">
   A starter project for building RESTful web services.
  </p>
</div>

## About

This is a TypeScript project that provides a foundation for building RESTful web services using [NodeJS](https://nodejs.org/en) and the [Express](https://expressjs.com/) framework. It builds upon [RESTful API Node Server Boilerplate](https://github.com/hagopj13/node-express-boilerplate) while keeping support for the same features and more. You can refer there for most of the core feature documentation.

## Prerequisites

- [Node](https://nodejs.org/en/download) version 22 or later
- [Docker](https://www.docker.com/) for local external app dependencies/tools (Postgres, PGAdmin, Grafana)
- [Git Bash](https://git-scm.com/downloads) (if on windows) for running shell scripts

## Quick Start

1. Run `npx @idvidrine/create-express-app yourAppName` or `npm init @idvidrine/express-app yourAppName` to initialize a new project.
2. `cd yourAppName` and `npm run dev` to start the app

## What's Different

### TypeScript

This project uses TypeScript instead of JavaScript for its powerful tooling and type safety, reducing bugs and improving developer experience.

### PostgreSQL

SQL database instead of NoSQL for structured data using [Prisma ORM](https://www.prisma.io/). It is also used as a store for the rate limiter.

### Cloud Native

This application is meant to run inside containers locally, on-premises or in the cloud. It doesn't store any state in memory.

### Observability

This project provides full application observability. It uses [OpenTelemetry](https://opentelemetry.io/) to collect/export logs, metrics and traces and send them to a [collector](https://opentelemetry.io/docs/collector/) running on the same network.

### Github Actions

CI/CD is implemented using Github Actions. It has the following workflows:

- lint.yaml: check for code quality
- test.yaml: run tests and upload coverage to codecov
- release-please.yaml: create a release PR and generate github release
- publish-docker.yaml: publish image to docker hub
- publish-npm.yaml: publish package to npm

### Packages

In addition to using the latest packages like Express 5, there were a number of different package choices made based on current community support and usefulness in this project:

- [Zod](https://zod.dev/) for object schemas / validation
- [Vitest](https://vitest.dev/) for unit/integration testing
- [Scalar](https://scalar.com/) for API documentation
- [pnpm](https://pnpm.io/) package manager

### Local Development

[Docker Compose](https://docs.docker.com/compose/) is used for local application infrastructure and tools. It provides the following for a strong local development experience:

- [PostgreSQL](https://www.postgresql.org/): main application database
- [pgAdmin](https://www.pgadmin.org/): database management tool
- [Grafana](https://grafana.com/): test visualizations, monitoring, alerts, etc.
- [Grafana Loki](https://grafana.com/oss/loki/): logs backend
- [Grafana Tempo](https://grafana.com/oss/tempo/): tracing backend
- [Grafana Mimir](https://grafana.com/oss/mimir/): metrics backend
- [Grafana Alloy](https://grafana.com/oss/alloy-opentelemetry-collector/) - the OTel collector

## Inspirations

- [RESTful API Node Server Boilerplate](https://github.com/hagopj13/node-express-boilerplate)
- [Wise Old Man](https://github.com/wise-old-man/wise-old-man)

## License

[MIT](LICENSE)

[codecov-badge]: https://codecov.io/gh/ividrine/express-starter-app/graph/badge.svg?token=WN052EGT8S
[codecov-url]: https://codecov.io/gh/ividrine/express-starter-app
