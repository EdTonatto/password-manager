![GitHub package.json version (main)](https://img.shields.io/github/package-json/v/EdTonatto/password-manager/main?label=main)
[![codecov](https://codecov.io/gh/EdTonatto/password-manager/branch/main/graph/badge.svg?token=Rq1bCo9Tqr)](https://codecov.io/gh/EdTonatto/password-manager)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/85ea8c2adfac456e92dd44d5bddb393c)](https://app.codacy.com/gh/EdTonatto/password-manager/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![CI](https://github.com/EdTonatto/password-manager/actions/workflows/node.js.yml/badge.svg)](https://github.com/EdTonatto/password-manager/actions/workflows/node.js.yml)
[![License](https://img.shields.io/github/license/EdTonatto/password-manager.svg)](https://github.com/EdTonatto/password-manager/blob/main/LICENSE)



# Password Manager

Password Manager is an API Rest to generate and store users passwords.

## Objective
- User authentication on API to protect some endpoints and data.
- Generate random password using an [library](https://github.com/EdTonatto/generate-random-secure-password-ts)
- Store this password on database. Users may be able to create, update, delete and list all passwords.

## Specifications

API developed in NodeJS with TypeScript using [NestJS](https://docs.nestjs.com/) framework, [Jest](https://jestjs.io/docs/getting-started) for unit tests and [MongoDB](https://www.mongodb.com/docs/) as database.

## How to use

1. Create an .env file at the root directory with your values for the following variables:
    ```
    MONGO_URL_CONNECTION=mongodb://your_mongodb/your_database
    JWT_SECRET=your_jwt_secret
    ```
2. To execute unit tests run `npm run test` on terminal or `npm run test:cov` to generate coverage.
2. To run API on docker run `docker-compose up -d --build` on terminal.

## Endpoints

