# recruit-crm-api

## Live Demo

[https://recruit-crm.qumber.ml](https://recruit-crm.qumber.ml)

## Description

APIs written in NestJS with Express and Typescript

## Prerequisites

- Node >= v18.xx
- MySQL >= 8

## Installation

```bash
$ npm install
```

## Create .env file

```bash
$ cp .env.example .env
```
Note: Change database credentials in `.env` as well as in `ormconfig.ts`.

The `ormconfig.ts` file cannot access environment variables while being used by Tyoeorm CLI as DataSource to run migrations.

# Run TypeORM migrations

```bash
$ npm run migrate:up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Demo Videos

#### - [APIs Demo](https://www.loom.com/share/3df306cfc37a4372b2a1b5cadb28e93a)

#### - [Source Code Demo](https://www.loom.com/share/44b508976ed3420c8f0f6b8048e01121)
