const Ajv = require('ajv')
const VError = require('verror')

function validatorFactory(schema, ajv) {

  if (!ajv) {
    ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    })
  }

  ajv.addSchema(schema)

  return function (body) {
    const isValid = ajv.validate(schema.id, body)
    if (!isValid) {
      const error = new VError({
        name: 'AJV_INVALID_PAYLOAD',
        info: { errors: ajv.errors }
      }, 'AJV detect an invalid payload')
      throw error
    }
  }
}

function middlewareFactory(schema, target, ajv) {
  const validator = validatorFactory(schema, options)
  return async function (ctx, next) {
    try {
      validator(ctx.request[target])
    } catch (err) {
      ctx.throw(400, err)
    }
    await next()
  }
}

function paramsValidator(schema, ajv) {
  const validator = validatorFactory(schema, options)
  return async function (ctx, next) {
    try {
      validator(ctx.params)
    } catch (err) {
      ctx.throw(400, err)
    }
    await next()
  }
}

module.exports = {
  createValidator: validatorFactory,
  paramsValidator,
  bodyValidator: (schema, ajv) => middlewareFactory(schema, 'body', ajv),
  queryValidator: (schema, ajv) => middlewareFactory(schema, 'query', ajv),
}
