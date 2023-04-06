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

