## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- ./src/common, to keep things that are not specific to any Domain.

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

**TypeORM**

```bash
npm i @nestjs/typeorm typeorm pg
```

The repository class acts like an abstraction over the data source and exposes a variety of useful methods to interact with the records stored in the database.

Relation between two entities:

- One (primary table) to one (foreign table)
- One (primary table) to many (foreign table) [many to one]
- Many (primary table) to many (foreign table)

```bash
nest g class coffees/entities/flavor.entity --no-spec
```

Relations are not eagerly loaded by default.

**Pagination**

```bash
nest g class common/dto/pagination-query.dto --no-spec
```

**Transactions**

Transaction statements can help us to achieve multiple actions to our database ensuring they only happen if everything is successful.

- In case something goes wrong, the transaction will rollback any changes, so both operations must be successful.

```bash
nest g class events/entities/event.entity --no-spec
```

**Indexes**

Are special lookup tables that our DB search engine can use to speed up data retrieval.

**Migrations**

Provide a way to incrementally update the database schema and keep it in sync with the applications data model, all while preserving existing data in our database.

TypeORM migrations need to work on compiled files, which NestJS will help output in the /dist folder.

```bash
# manually create a migration
npx typeorm migration:create -n CoffeeRefactor
# automatically create a migration
npx typeorm migration:generate -n SchemaSync
```

Prior to executing a migration, we need to make sure we build the source code so that TypeORM CLI can find the entities and migration files in the /dist folder.

```bash
# we must compile the code after the changes are done to the entities
npm run build

# to execute the migration (Up method)
npx typeorm migration:run
# to revert the migration (Down method)
npx typeorm migration:revert
```

**Dependency Injection**

Is a technique where we delegate the instantiation of dependencies to an IOC container, which in this case is NestJS runtime system itself.

When we ask for a dependency in a class constructor, NestJS handles and retrieves the object to us. The proccess is the following:

1. @Injectable() decorator declares a class (the service) that can be managed by the NestJS container. It marks the class as a provider.
2. Request the class inside the constructor (the controller).
3. The provider was registered at the module, inside the providers property.

Providers have a singleton scope (that's the default), so NestJS will either create an instance of the class or return the one that was already in cache.

**Module Encapsulation**

By default, NestJS modules encapsulate their providers.

```bash
nest g mo coffee-rating
nest g s coffee-rating
```

If we intend to import and use any module/service, we should also make sure to export the service/provider in order to avoid this kind of error:

```bash
[Nest] 21441 - 21/05/2021 12:26:11 [ExceptionHandler] Nest can't resolve dependencies of the CoffeeRatingService (?). Please make sure that the argument CoffeesService at index [0] is available in the CoffeeRatingModule context.
```

**Providers Scope**

Once the application has bootstraped, all singleton providers have been instantiated.

There are 3 types of scope providers:

- Singleton (default).
  - (e.g.: coffees.service.ts)
    - @Injectable()
    - @Injectable({ scope: Scope.DEFAULT })
- Transient, are not shared across consumers. Each consumer that injects a transient provider, will receive a new dedicated instance of that provider.
  - (e.g.: coffees.service.ts)
    - @Injectable({ scope: Scope.TRANSIENT })
  - (e.g.: coffees.module.ts > after useFactory)
    - scope: Scope.TRANSIENT
- Request, provides a new instance of the provider exclusively for each incoming request. The instance is automatically garbage collected after the request has completed processing. Using it may have a high impact on performance.
  - (e.g.: coffees.service.ts)
    - @Injectable({ scope: Scope.REQUEST })

**Config Module**

```bash
npm install @nestjs/config
```

- Create a .env file to store the environment variables
- Add the .env into .gitignore
- +process.env.DATABASE_PORT, to cast it into a number

Optional properties that can be used:

```bash
ConfigModule.forRoot({
  # to specify a different directory and name for the .env file
  envFilePath: '.environment',
  # to ignore the env file
  ignoreEnvFile: true,
}),
```

Validating the environment variables:

```bash
npm install @hapi/joi
npm install --save-dev @types/hapi__joi
```

With custom configuration files we can create different configurations but it's recommended for simpler projects (it has no type inference for example). If we have deeply nested configurations, we might want to use Configuration Namespaces.

**More Building Blocks**

- Exception filters, are responsible for handling and processing unhandled exceptions that might occur in the application.
- Pipes, are useful to handle 2 things 'transformations' and 'validation'.
- Guards, are responsible for telling if a given request needs certain conditions like authentication, authorizations, roles, acls, etc.
- Interceptors, make it possible to:
  - Bind extra logic before or after the method execution.
  - Transform the result returned from a method.
  - Extend method behavior.
  - Completely override a method.

Binding techniques, making use of the @UsePipes(ValidationPipe), that can be placed in several places, depending on our need:

- Global scoped
  - Check app.useGlobalPipes at main.ts
  - Or inside a module provider

```bash
{
  provide: APP_PIPE,
  useClass: ValidationPipe,
}
```

- Controller scoped, via @UsePipes(ValidationPipe) right before @Controller
- Method scoped, via @UsePipes(ValidationPipe) right before @Get or any other route/method
- Param scoped (pipes only), via the parameter itself with @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto

**Catch Exceptions with Filters**

```bash
nest g filter common/filters/http-exception
```

By calling a unexisting route, it throws an HttpErrorException: http://localhost:3000/coffees/-1

**Guards**

Has a single responsibility, which is to determine whether a given request is allowed to access something.

```bash
nest g guard common/guards/api-key
```

Global guards that make use of other classes, must be registered within a module. In our case, it was being used directly on main.ts, thus, resulting on the following error:

```bash
src/main.ts:20:23 - error TS2554: Expected 2 arguments, but got 0.
20   app.useGlobalGuards(new ApiKeyGuard());
                         ~~~~~~~~~~~~~~~~~
  src/common/guards/api-key.guard.ts:11:5
    11     private readonly reflector: Reflector,
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    An argument for 'reflector' was not provided.
```

To solve that, we need a new module:

```bash
nest g mo common
```

**Interceptors**

On this example it will wrap our data into a data property automatically:

```bash
nest g interceptor common/interceptors/wrap-response
```

Handling timeouts with interceptors:

```bash
nest g interceptor common/interceptors/timeout
```

**Pipes**

NestJS triggers a Pipe just before any method is invoked.

```bash
nest g pipe common/pipes/parse-int
```

**Middleware**

Is a function that is called before the route handler and any other building blocks are processed.

Can be used as:

- Function, which are stateless and can't inject dependencies.
- Class, which can rely on external dependencies and inject providers that are registered on the same module scope.

```bash
nest g middleware common/middleware/logging
```

**Decorators**

Are simply functions that apply logic.
