
const test = require('ava')
const VError = require('verror')
const koaValidator = require('./')

test('bodyValidator() : Should validate the payload', async (t) => {
  t.plan(1)

  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }

  const middleware = koaValidator.bodyValidator(schema)
  const context = {
    request:{ body: { name: 'toto' } },
    throw: (status, err) => t.fail(err)
  }
  await middleware(context, async () => t.pass())
})

test('bodyValidator() : Should throw because the payload is invalid', async (t) => {
  t.plan(5)
  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      age: { type: 'integer' }
    }
  }

  const middleware = koaValidator.bodyValidator(schema)
  const context = {
    request:{ body: { age: 'toto' } },
    throw: (status, err) => {
      t.deepEqual(status, 400)
      t.deepEqual(err.name, 'AJV_INVALID_PAYLOAD')
      t.deepEqual(err.message, 'AJV detect an invalid payload')
      const errorInfos = VError.info(err)
      t.deepEqual(errorInfos.errors.length, 1)
      t.deepEqual(errorInfos.errors[0], {
        keyword: 'type',
        dataPath: '.age',
        schemaPath: '#/properties/age/type',
        params: { type: 'integer' },
        message: 'should be integer'
      })
    }
  }
  await middleware(context, async () => {})
})

test('queryValidator() : Should throw because the query object is invalid', async (t) => {
  t.plan(5)
  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      age: { type: 'integer' }
    }
  }

  const middleware = koaValidator.queryValidator(schema)
  const context = {
    request:{ query: { age: 'toto' } },
    throw: (status, err) => {
      t.deepEqual(status, 400)
      t.deepEqual(err.name, 'AJV_INVALID_PAYLOAD')
      t.deepEqual(err.message, 'AJV detect an invalid payload')
      const errorInfos = VError.info(err)
      t.deepEqual(errorInfos.errors.length, 1)
      t.deepEqual(errorInfos.errors[0], {
        keyword: 'type',
        dataPath: '.age',
        schemaPath: '#/properties/age/type',
        params: { type: 'integer' },
        message: 'should be integer'
      })
    }
  }
  await middleware(context, async () => {})
})

test('queryValidator() : Should validate the payload', async (t) => {
  t.plan(1)

  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }

  const middleware = koaValidator.queryValidator(schema)
  const context = {
    request:{ query: { name: 'toto' } },
    throw: (status, err) => t.fail(err)
  }
  await middleware(context, async () => t.pass())
})

test('paramsValidator() : Should throw because the query object is invalid', async (t) => {
  t.plan(5)
  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      age: { type: 'integer' }
    }
  }

  const middleware = koaValidator.paramsValidator(schema)
  const context = {
    params: { age: 'toto' },
    throw: (status, err) => {
      t.deepEqual(status, 400)
      t.deepEqual(err.name, 'AJV_INVALID_PAYLOAD')
      t.deepEqual(err.message, 'AJV detect an invalid payload')
      const errorInfos = VError.info(err)
      t.deepEqual(errorInfos.errors.length, 1)
      t.deepEqual(errorInfos.errors[0], {
        keyword: 'type',
        dataPath: '.age',
        schemaPath: '#/properties/age/type',
        params: { type: 'integer' },
        message: 'should be integer'
      })
    }
  }
  await middleware(context, async () => {})
})

test('paramsValidator() : Should validate the payload', async (t) => {
  t.plan(1)

  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }

  const middleware = koaValidator.paramsValidator(schema)
  const context = {
    params: { name: 'toto' },
    throw: (status, err) => t.fail(err)
  }
  await middleware(context, async () => t.pass())
})

test('createValidator() : Should throw because the object is invalid', async (t) => {
  t.plan(4)
  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      age: { type: 'integer' }
    }
  }

  const validator = koaValidator.createValidator(schema)
  const object = { age: 'toto' }
  try {
    await validator(object)
  } catch (err) {
    t.deepEqual(err.name, 'AJV_INVALID_PAYLOAD')
    t.deepEqual(err.message, 'AJV detect an invalid payload')
    const errorInfos = VError.info(err)
    t.deepEqual(errorInfos.errors.length, 1)
    t.deepEqual(errorInfos.errors[0], {
      keyword: 'type',
      dataPath: '.age',
      schemaPath: '#/properties/age/type',
      params: { type: 'integer' },
      message: 'should be integer'
    })
  }
})

test('createValidator() : Should validate the payload', async (t) => {
  t.plan(1)

  const schema = {
    id: 'toto',
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }

  const validator = koaValidator.createValidator(schema)
  const object = { age: 'toto' }
  try {
    await validator(object)
  } catch (err) {
    t.fail('Should not throw because the object is valid')
  }
  t.pass()
})
