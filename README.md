# Koa-validator-ajv

Koa middleware factory to validate, querystring, body payload, route params

You can find examples of how to use this library.
You can also look at the tests scenarios in the tests directory to get running examples to use.

## Body validation :

In this example the call can looks like : `POST http://host.com/example/body`

```js
const koaValidator = require('koa-validator-ajv')

const schema = {
  id: 'userSchema',
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    category: { type: 'string', pattern: '^Teacher|Student$' },
  }
}

const bodyValidatorMiddleware = koaValidator.bodyValidator(schema) // Wille check ctx.request.body

router.post('/example/body', bodyValidatorMiddleware, routeHandler)
```

## Querystring validation :

In this example the call can looks like : `GET http://host.com/example/query?name=test&category=Student`

```js
const koaValidator = require('koa-validator-ajv')

const schema = {
  id: 'querySchema',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    category: { type: 'string', pattern: '^Teacher|Student$' },
  }
}

const queryValidatorMiddleware = koaValidator.queryValidator(schema) // Will check ctx.request.query

router.get('/example/query', queryValidatorMiddleware, routeHandler)
```

## Params validation :

In this example the call can looks like : `GET http://host.com/example/params/teacher`

```js
const koaValidator = require('koa-validator-ajv')

const schema = {
  id: 'paramsSchema',
  type: 'object',
  additionalProperties: false,
  properties: {
    category: { type: 'string', pattern: `^teacher|student$`},
  }
}

const paramsValidatorMiddleware = koaValidator.paramsValidator(schema) // Will check ctx.params

router.get('/example/params/:category', paramsValidatorMiddleware, routeHandler)
```

## Generic validation :

You can also instantiate a validator function by using the factory method `koaValidator.createValidator()'

```js
const koaValidator = require('koa-validator-ajv')

const schema = {
  id: 'userSchema',
  type: 'object',
  additionalProperties: false,
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    category: { type: 'string', pattern: '^Teacher|Student$' },
  }
}

const validator = koaValidator.createValidator(schema) // return a method

try {
  validator({ invalid: 'test' }) // If the object is not matching the schema an execption is thrown
} catch (err) {

}
```

## Tests

To Launch the tests :

- run : `$ npm install`
- run : `$ npm test`
- run : `$ npm run watch` : It launch test when you change the code

(The tests will run a koa app on port 9000 be sure that this port is available)

## Code Coverage

After running `$ npm test` you can access the code coverage report here : `./coverage/index.html`
