## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
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

## Tutorial

```bash
$ nestjs new
# iluvcoffee
# npm
```

**Generating a controller**

```bash
nest generate controller
nest g co
nest generate controller modules/abc
nest generate controller modules/abc --dry-run
```

**Generating a service**

```bash
nest generate service
nest g s
nest generate service modules/abc
nest generate service modules/abc --dry-run
```

In NestJS, each service is a provider. It's just a class annoted with the decorator called @Injectable.

Provider, it can inject dependencies so NestJS system will handle all of that instead of the developer having to do it manually
