<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">

[![codecov][codecov-badge]][codecov-url]

   <h3 align="center">Node Express API Boilerplate</h3>

  <p align="center">
   A starter project for quickly building RESTful APIs using Node.js, Express, and Prisma.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
   <summary>Table of Contents</summary>
   <ol>
      <li>
         <a href="#about-the-project">About The Project</a>
         <ul>
            <li><a href="#built-with">Built With</a></li>
         </ul>
      </li>
      <li>
         <a href="#getting-started">Getting Started</a>
         <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
         </ul>
      </li>
      <li><a href="#features">Features</a></li>
      <li><a href="#commands">Commands</a></li>
      <li><a href="#environment-variables">Environment Variables</a></li>
      <li><a href="#project-structure">Project Structure</a></li>
      <li><a href="#api-documentation">API Documentation</a></li>
      <li><a href="#error-handling">Error Handling</a></li>
      <li><a href="#validation">Validation</a></li>
      <li><a href="#authentication">Authentication</a></li>
      <li><a href="#authorization">Authorization</a></li>
      <li><a href="#logging">Logging</a></li>
      <li><a href="#linting">Linting</a></li>
   </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a fork of [RESTful API Node Server Boilerplate](https://github.com/hagopj13/node-express-boilerplate) that adds type safety and works for relational databases.

### Built With

[![Node.js][node-badge]][node-url]
[![TypeScript][typescript-badge]][typescript-url]
[![Express][express-badge]][express-url]
[![Prisma][prisma-badge]][prisma-url]
[![PostgreSQL][postgres-badge]][postgres-url]
[![JWT][jsonwebtoken-badge]][jsonwebtoken-url]
[![Zod][zod-badge]][zod-url]
[![Winston][winston-badge]][winston-url]
[![Vitest][vitest-badge]][vitest-url]
[![Scalar][scalar-badge]][scalar-url]
[![ESLint][eslint-badge]][eslint-url]
[![Prettier][prettier-badge]][prettier-url]
[![Husky][husky-badge]][husky-url]
[![Docker][docker-badge]][docker-url]
[![pnpm][pnpm-badge]][pnpm-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- [Node](https://nodejs.org/en/download)
- [Docker](https://www.docker.com/) - for local external app dependencies/tools (Postgres, PGAdmin)
- [Git Bash](https://git-scm.com/downloads) (if on windows)

### Quick Start

1. Run `npx create-express-sql-app yourAppName` or `npm init express-sql-app yourAppName` to initialize a new project.
2. `cd yourAppName` and `npm run dev` to start the app

### Manual Installation

For manual installations, follow these steps

1. Clone the repo

```bash
git clone --depth 1 https://github.com/ividrine/express-api-sql.git
cd express-api-sql
npx rimraf ./.git
```

2. Install the dependencies:

```bash
pnpm install
```

3. Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- Type Safety - [Typescript](https://www.typescriptlang.org/)
- Relational Database / ORM - [PostgreSql](https://www.postgresql.org/) and [Prisma](https://www.prisma.io/)
- Authentication / Authorization - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) and [node-oauth2-jwt-bearer](https://github.com/auth0/node-oauth2-jwt-bearer)
- Request Data Validation - [Zod](https://zod.dev/)
- Logging - [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan)
- Centralized Error Handling Mechanism
- Security Headers - [helmet](https://helmetjs.github.io)
- Request Data Sanitization - [express-xss-sanitizer](https://github.com/AhmedAdelFahim/express-xss-sanitizer)
- Gzip Compression - [compression](https://github.com/expressjs/compression)
- Cross-Origin Resource-Sharing - [cors](https://github.com/expressjs/cors)
- Environment Variables - [dotenv-cli](https://www.npmjs.com/package/dotenv-cli)
- Unit and Integration Tests - [Vitest](https://vitest.dev/)
- API Documentation - [Scalar](https://scalar.com/) and [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- CI - [Github Actions](https://github.com/features/actions)
- Git Hooks - [Husky](https://typicode.github.io/husky/) and [Lint-staged](https://github.com/lint-staged/lint-staged)
- Linting - [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- Consistent Code Style across IDEs - [EditorConfig](https://editorconfig.org)
- Dependency Management - [PNPM](https://pnpm.io/)
- Local Infrastructure - [Docker](https://www.docker.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Commands

These are the npm scripts defined in package.json

```json
"build": "rm -rf ./dist/ && prisma generate && tsc",
"lint": "eslint",
"prod": "sh ./scripts/run-prod.sh",
"dev": "sh ./scripts/run-dev.sh",
"test": "sh ./scripts/run-tests.sh",
"envup": "docker-compose up --build -d",
"envdown": "docker-compose down",
"prepare": "husky"
```

### `build`

Removes the dist directory, generates prisma client and compiles typescript.

### `lint`

Runs eslint.

### `prod`

Generates prisma client, sets NODE_ENV to prod and runs compiled js.

### `dev`

Starts external app dependencies with docker-compose, runs prisma migration / seeds database if needed and starts app in watch mode.

### `test`

Runs docker-compose unless passed "CI" as the first argument, in which case it skips this step. Can pass any number of vitest options to this command. Ex. `npm run test --ui --coverage` or `npm run test CI --coverage`

### `envup`

Starts external app dependencies with docker-compose.

### `envdown`

Tears down external app dependencies. You can pass arguments to underlying docker-compose command like this `pnpm envdown -- -v` or `npm run envdown -- -v` to also remove volumes.

### `prepare`

Runs husky to install/setup git hooks

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Environment Variables

This project uses `.env` files to load environment variables into node's `process.env` object for local development. They are git ignored to avoid checking secrets and other sensitive data into source control. See [here](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs) for more information about environment variables in node.

The environment variables can be found and modified in the `.env` file. They come with these default values

```
# App
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/appdb

# JWT
JWT_SECRET=thisisasamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10

# SMTP - For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--constants\      # App constants
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--lib\            # Db clients / connections / integrations
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--types\          # Typescript types/interfaces
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [openapi](https://www.openapis.org/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\
`POST /v1/auth/forgot-password` - send reset password email\
`POST /v1/auth/reset-password` - reset password\
`POST /v1/auth/send-verification-email` - send verification email\
`POST /v1/auth/verify-email` - verify email

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```typescript
import catchAsync from "../utils/catchAsync.js";

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error("Something wrong happened");
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```typescript
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import prisma from "../lib/prisma/index.js";

const getUser = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
};
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Validation

Request data is validated using [Zod](https://zod.dev/). Check the [documentation](https://zod.dev/basics) for more details on how to write Zod validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```typescript
import express from "express";
import validate from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";
import userController from "../../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/users",
  validate(userValidation.createUser),
  userController.createUser
);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authentication

To require authentication for certain routes, you can use the `authorize` middleware.

```typescript
import express from "express";
import authorize from "../../middlewares/auth.js";
import userController from "../../controllers/user.controller.js";

const router = express.Router();

router.post("/users", authorize(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `JWT_REFRESH_EXPIRATION_DAYS` environment variable in the .env file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Authorization

The `authorize` middleware can also be used to require certain permissions to access a route.

```typescript
import express from "express";
import authorize from "../../middlewares/auth.js";
import userController from "../../controllers/user.controller.js";
import { CREATE_USERS } from "../../constants/permission.constants.js";

const router = express.Router();

router.post("/users", authorize(CREATE_USERS), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the `CREATE_USERS` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/constants/role.constants.ts` file.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```typescript
import logger from "<path to src>/config/logger";

logger.error("message"); // level 0
logger.warn("message"); // level 1
logger.info("message"); // level 2
logger.http("message"); // level 3
logger.verbose("message"); // level 4
logger.debug("message"); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server to actually read them from the console and store them in log files.\

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `eslint.config.ts` file. To modify the Prettier configuration, update the `.prettierrc` file.

To prevent a certain file or directory from being linted, add to the `ignores` array in `eslint.config.ts` and update `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## Inspirations

- [RESTful API Node Server Boilerplate](https://github.com/hagopj13/node-express-boilerplate)
- [Wise Old Man](https://github.com/wise-old-man/wise-old-man)

## License

[MIT](LICENSE)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[codecov-badge]: https://codecov.io/gh/ividrine/express-api-sql/graph/badge.svg?token=WN052EGT8S
[codecov-url]: https://codecov.io/gh/ividrine/express-api-sql
[docker-badge]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[eslint-badge]: https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[eslint-url]: https://eslint.org/
[express-badge]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[husky-badge]: https://img.shields.io/badge/husky-FF6B35?style=for-the-badge&logo=git&logoColor=white
[husky-url]: https://typicode.github.io/husky/
[jsonwebtoken-badge]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[jsonwebtoken-url]: https://github.com/auth0/node-jsonwebtoken
[lint-staged-badge]: https://img.shields.io/badge/lint--staged-FF6B35?style=for-the-badge&logo=git&logoColor=white
[lint-staged-url]: https://github.com/lint-staged/lint-staged
[morgan-badge]: https://img.shields.io/badge/morgan-000000?style=for-the-badge&logo=express&logoColor=white
[morgan-url]: https://github.com/expressjs/morgan
[node-badge]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/download
[pgadmin-badge]: https://img.shields.io/badge/pgAdmin-316192?style=for-the-badge&logo=postgresql&logoColor=white
[pgadmin-url]: https://www.pgadmin.org/
[pnpm-badge]: https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white
[pnpm-url]: https://pnpm.io/
[postgres-badge]: https://img.shields.io/badge/postgresql-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-url]: https://www.postgresql.org/
[prettier-badge]: https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black
[prettier-url]: https://prettier.io/
[prisma-badge]: https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[scalar-badge]: https://img.shields.io/badge/scalar-000000?style=for-the-badge&logo=scalar&logoColor=white
[scalar-url]: https://scalar.com/
[typescript-badge]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[vitest-badge]: https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[vitest-url]: https://vitest.dev/
[winston-badge]: https://img.shields.io/badge/winston-231F20?style=for-the-badge
[winston-url]: https://github.com/winstonjs/winston
[zod-badge]: https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white
[zod-url]: https://github.com/colinhacks/zod
