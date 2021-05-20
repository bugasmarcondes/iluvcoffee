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

## Troubleshoot

```bash
# check which ports are in use
sudo lsof -i -P | grep LISTEN
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

Provider, it can inject dependencies so NestJS system will handle all of that instead of the developer having to do it manually.

**Modules**

They are an effective way to organize the application components as they encapsulate a closely related set of capabilities.

- Manage complexity.
- Develop with SOLID principles, specially as the size of the application or team grows.

```bash
nest generate module
nest g module coffees
```

A module contains:

- Controllers, API routes we want this module to instantiate.
- Exports, list of providers that are available wherever we import this module.
- Imports, list of other modules that this module requires.
- Providers, list of services that need to be instatiated by the Nest injector. Any providers here will be available only whitin this module itself, unless added to the exports array above.

**DTO**

Is an object that is used to encapsulate data and send it from one application to another. It help us define the interfaces for input and output within our system.

- Shape the object the way we want/need.
- Provide type safety.

```bash
nest g class coffees/dto/create-coffee.dto --no-spec
nest g class coffees/dto/update-coffee.dto --no-spec
```

**Validate input data**

ValidationPipe, automatically validate the encoming requests.

- If we send invalid data, it automatically responds with a 400 error.

```bash
npm i class-validator class-transformer
npm i @nestjs/mapped-types
```

With @nestjs/mapped-types "PartialType", it marks all the fields from the referenced DTO as optional, and also inherits all the validation rules applied.

Filter properties that should not be received by a method handler.

- whitelist: true,
  - Accepts the input, but removes all the invalid properties on the output
- forbidNonWhitelisted: true,
  - Doesn't even accept the input, throwing a 400 error
- transform: true,
  - makes console.log(createCoffeeDto instanceof CreateCoffeeDto) return true
  - this feature may impact performance

**Docker**

Is a plataform for developers to build, run and share (ship) applications that are within containers.

The use of containers to deploy applications is called containerization.

- Flexible
- Lightweight
- Portable
- Loosely coupled

Docker compose is a tool for defining and running multiple container Docker applications. We configure our services with a YML file.

- With a single command we can create and start all the services from our configuration on any machine.

Container, is simply another process on your machine that has been isolated from all other processes on the host machine.

Image, contains other configuration for the container, such as environment variables, a default command to run, and other metadata.

Creation of the "docker-compose.yml" file:

```bash
docker-compose up -d
```
