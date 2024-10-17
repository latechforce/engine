import { test, expect, js } from '@tests/fixtures'
import App, { type App as Config } from '@safidea/engine'
import Database from '@tests/database'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import { join } from 'path'

test.describe('Run javascript code action', () => {
  test('should run a javascript code', async ({ request }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'addNumbers',
          trigger: {
            event: 'ApiCalled',
            path: 'add-numbers',
            input: {
              numberOne: { type: 'number' },
              numberTwo: { type: 'number' },
            },
            output: {
              sum: {
                value: '{{runJavascriptCode.result}}',
                type: 'number',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              input: {
                numberOne: {
                  value: '{{trigger.body.numberOne}}',
                  type: 'number',
                },
                numberTwo: {
                  value: '{{trigger.body.numberTwo}}',
                  type: 'number',
                },
              },
              code: js`
                  const { numberOne, numberTwo } = inputData
                  return { result: numberOne + numberTwo }
                `,
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    const { response } = await request
      .post(`${url}/api/automation/add-numbers`, {
        data: {
          numberOne: 1,
          numberTwo: 2,
        },
      })
      .then((res) => res.json())

    // THEN
    expect(response.sum).toBe(3)
  })

  test('should run a javascript code with env variable', async ({ request }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'getEnv',
          trigger: {
            event: 'ApiCalled',
            path: 'get-env',
            output: {
              NODE_ENV: {
                value: '{{runJavascriptCode.NODE_ENV}}',
                type: 'string',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              env: {
                NODE_ENV: 'test',
              },
              code: js`
                  const { NODE_ENV } = env
                  return { NODE_ENV }
                `,
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    const { response } = await request
      .post(`${url}/api/automation/get-env`)
      .then((res) => res.json())

    // THEN
    expect(response.NODE_ENV).toBe('test')
  })

  test('should run a javascript code with env variable and not showing them in logs', async ({
    request,
  }) => {
    // GIVEN
    const filename = join(process.cwd(), 'tmp', `app-${nanoid()}.log`)
    fs.ensureFileSync(filename)
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'getEnv',
          trigger: {
            event: 'ApiCalled',
            path: 'get-env',
            output: {
              NODE_ENV: {
                value: '{{runJavascriptCode.NODE_ENV}}',
                type: 'string',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              env: {
                NODE_ENV: 'xxx',
              },
              code: js`
                  const { NODE_ENV } = env
                  return { success: !!NODE_ENV }
                `,
            },
          ],
        },
      ],
      logger: {
        driver: 'File',
        filename,
      },
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    await request.post(`${url}/api/automation/get-env`)

    // THEN
    const content = await fs.readFile(filename, 'utf8')
    expect(content).not.toContain('xxx')
  })

  Database.each(test, (dbConfig) => {
    test('should run a javascript code with a database insert', async ({ request }) => {
      // GIVEN
      const database = new Database(dbConfig)
      const config: Config = {
        name: 'App',
        tables: [{ name: 'users', fields: [{ name: 'name', field: 'SingleLineText' }] }],
        automations: [
          {
            name: 'createUser',
            trigger: {
              event: 'ApiCalled',
              path: 'create-user',
              input: {
                name: { type: 'string' },
              },
              output: {
                user: {
                  value: '{{runJavascriptCode.user}}',
                  type: 'object',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunJavascript',
                name: 'runJavascriptCode',
                input: {
                  name: {
                    value: '{{trigger.body.name}}',
                    type: 'string',
                  },
                },
                code: js`
                  const { name } = inputData
                  const user = await table('users').insert({ name })
                  return { user }
                `,
              },
            ],
          },
        ],
        database: dbConfig,
      }
      const app = new App()
      const url = await app.start(config)

      // WHEN
      const { response } = await request
        .post(`${url}/api/automation/create-user`, {
          data: {
            name: 'John',
          },
        })
        .then((res) => res.json())

      // THEN
      const user = await database.table('users').readById(response.user.id)
      expect(response.user.name).toBe('John')
      expect(user?.name).toBe('John')
    })

    test('should run a javascript code with a database update', async ({ request }) => {
      // GIVEN
      const database = new Database(dbConfig)
      const config: Config = {
        name: 'App',
        tables: [{ name: 'users', fields: [{ name: 'name', field: 'SingleLineText' }] }],
        automations: [
          {
            name: 'updateUser',
            trigger: {
              event: 'ApiCalled',
              path: 'update-user',
              input: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
              output: {
                user: {
                  value: '{{runJavascriptCode.user}}',
                  type: 'object',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunJavascript',
                name: 'runJavascriptCode',
                input: {
                  id: {
                    value: '{{trigger.body.id}}',
                    type: 'string',
                  },
                  name: {
                    value: '{{trigger.body.name}}',
                    type: 'string',
                  },
                },
                code: js`
                  const { name, id } = inputData
                  const user = await table('users').update(id, { name })
                  return { user }
                `,
              },
            ],
          },
        ],
        database: dbConfig,
      }
      const app = new App()
      const url = await app.start(config)
      await database.table('users').insert({ id: '1', name: 'John', created_at: new Date() })

      // WHEN
      const { response } = await request
        .post(`${url}/api/automation/update-user`, {
          data: {
            id: '1',
            name: 'John Doe',
          },
        })
        .then((res) => res.json())

      // THEN
      const user = await database.table('users').readById(response.user.id)
      expect(response.user.name).toBe('John Doe')
      expect(user?.name).toBe('John Doe')
    })

    test('should run a javascript code with a database read', async ({ request }) => {
      // GIVEN
      const database = new Database(dbConfig)
      const config: Config = {
        name: 'App',
        tables: [{ name: 'users', fields: [{ name: 'name', field: 'SingleLineText' }] }],
        automations: [
          {
            name: 'readUser',
            trigger: {
              event: 'ApiCalled',
              path: 'read-user',
              input: {
                id: { type: 'string' },
              },
              output: {
                user: {
                  value: '{{runJavascriptCode.user}}',
                  type: 'object',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunJavascript',
                name: 'runJavascriptCode',
                input: {
                  id: {
                    value: '{{trigger.body.id}}',
                    type: 'string',
                  },
                },
                code: js`
                  const { id } = inputData
                  const user = await table('users').read(id)
                  return { user }
                `,
              },
            ],
          },
        ],
        database: dbConfig,
      }
      const app = new App()
      const url = await app.start(config)
      await database.table('users').insert({ id: '1', name: 'John Doe', created_at: new Date() })

      // WHEN
      const { response } = await request
        .post(`${url}/api/automation/read-user`, {
          data: {
            id: '1',
          },
        })
        .then((res) => res.json())

      // THEN
      expect(response.user.name).toBe('John Doe')
    })

    test('should run a javascript code with a database list', async ({ request }) => {
      // GIVEN
      const database = new Database(dbConfig)
      const config: Config = {
        name: 'App',
        tables: [{ name: 'users', fields: [{ name: 'name', field: 'SingleLineText' }] }],
        automations: [
          {
            name: 'listUsers',
            trigger: {
              event: 'ApiCalled',
              path: 'list-users',
              output: {
                users: {
                  value: '{{runJavascriptCode.users}}',
                  type: 'array',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunJavascript',
                name: 'runJavascriptCode',
                code: js`
                  const { id } = inputData
                  const users = await table('users').list()
                  return { users }
                `,
              },
            ],
          },
        ],
        database: dbConfig,
      }
      const app = new App()
      const url = await app.start(config)
      await database.table('users').insertMany([
        { id: '1', name: 'John Doe', created_at: new Date() },
        { id: '2', name: 'John Wick', created_at: new Date() },
        { id: '3', name: 'John Connor', created_at: new Date() },
      ])

      // WHEN
      const { response } = await request
        .post(`${url}/api/automation/list-users`, {
          data: {
            id: '1',
          },
        })
        .then((res) => res.json())

      // THEN
      expect(response.users).toHaveLength(3)
      expect(response.users[0].name).toBe('John Doe')
      expect(response.users[1].name).toBe('John Wick')
      expect(response.users[2].name).toBe('John Connor')
    })

    test('should run a javascript code with a database list with is filter', async ({
      request,
    }) => {
      // GIVEN
      const database = new Database(dbConfig)
      const config: Config = {
        name: 'App',
        tables: [{ name: 'users', fields: [{ name: 'name', field: 'SingleLineText' }] }],
        automations: [
          {
            name: 'listUsers',
            trigger: {
              event: 'ApiCalled',
              path: 'list-users',
              output: {
                users: {
                  value: '{{runJavascriptCode.users}}',
                  type: 'array',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunJavascript',
                name: 'runJavascriptCode',
                code: js`
                  const users = await table('users').list([{ field: 'id', operator: 'is', value: '2' }])
                  return { users }
                `,
              },
            ],
          },
        ],
        database: dbConfig,
      }
      const app = new App()
      const url = await app.start(config)
      await database.table('users').insertMany([
        { id: '1', name: 'John Doe', created_at: new Date() },
        { id: '2', name: 'John Wick', created_at: new Date() },
        { id: '3', name: 'John Connor', created_at: new Date() },
      ])

      // WHEN
      const { response } = await request
        .post(`${url}/api/automation/list-users`)
        .then((res) => res.json())

      // THEN
      expect(response.users).toHaveLength(1)
      expect(response.users[0].name).toBe('John Wick')
    })

    test('should run a javascript code with a database list with isAnyOf filter', async ({
      request,
    }) => {
      // GIVEN
      const database = new Database(dbConfig)
      const config: Config = {
        name: 'App',
        tables: [{ name: 'users', fields: [{ name: 'name', field: 'SingleLineText' }] }],
        automations: [
          {
            name: 'listUsers',
            trigger: {
              event: 'ApiCalled',
              path: 'list-users',
              output: {
                users: {
                  value: '{{runJavascriptCode.users}}',
                  type: 'array',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunJavascript',
                name: 'runJavascriptCode',
                code: js`
                  const users = await table('users').list([{ field: 'id', operator: 'isAnyOf', value: ['3', '2'] }])
                  return { users }
                `,
              },
            ],
          },
        ],
        database: dbConfig,
      }
      const app = new App()
      const url = await app.start(config)
      await database.table('users').insertMany([
        { id: '1', name: 'John Doe', created_at: new Date() },
        { id: '2', name: 'John Wick', created_at: new Date() },
        { id: '3', name: 'John Connor', created_at: new Date() },
      ])

      // WHEN
      const { response } = await request
        .post(`${url}/api/automation/list-users`)
        .then((res) => res.json())

      // THEN
      expect(response.users).toHaveLength(2)
      expect(response.users[0].name).toBe('John Wick')
      expect(response.users[1].name).toBe('John Connor')
    })
  })

  test('should run a javascript code with services.converter.xmlToJson', async ({ request }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'parseXml',
          trigger: {
            event: 'ApiCalled',
            path: 'parse-xml',
            output: {
              result: {
                value: '{{runJavascriptCode.result}}',
                type: 'object',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              code: js`
                  const xml = '<result><root><item>Value1</item><item>Value2</item></root><key> value </key></result>'
                  const { result } = await services.converter.xmlToJson(xml)
                  return { result }
                `,
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    const { response } = await request
      .post(`${url}/api/automation/parse-xml`)
      .then((res) => res.json())

    // THEN
    expect(response.result).toStrictEqual({
      key: 'value',
      root: { item: ['Value1', 'Value2'] },
    })
  })

  test('should run a javascript code with the native Date class', async ({ request }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'getTimestamp',
          trigger: {
            event: 'ApiCalled',
            path: 'get-timestamp',
            output: {
              timestamp: {
                value: '{{runJavascriptCode.timestamp}}',
                type: 'number',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              code: js`
                  const timestamp = Date.now()
                  return { timestamp }
                `,
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    const { response } = await request
      .post(`${url}/api/automation/get-timestamp`)
      .then((res) => res.json())

    // THEN
    expect(response.timestamp).toBeGreaterThan(0)
  })

  test('should run a javascript code with the native Array class', async ({ request }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'getIsArray',
          trigger: {
            event: 'ApiCalled',
            path: 'is-array',
            output: {
              isArray: {
                value: '{{runJavascriptCode.isArray}}',
                type: 'boolean',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              code: js`
                  const isArray = Array.isArray([1, 2, 3])
                  return { isArray }
                `,
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    const { response } = await request
      .post(`${url}/api/automation/is-array`)
      .then((res) => res.json())

    // THEN
    expect(response.isArray).toBeTruthy()
  })

  test('should run a javascript code with the native Number class', async ({ request }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'getIsNumber',
          trigger: {
            event: 'ApiCalled',
            path: 'is-number',
            output: {
              isNumber: {
                value: '{{runJavascriptCode.isNumber}}',
                type: 'boolean',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              code: js`
                  const isNumber = Number("1") == 1
                  return { isNumber }
                `,
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    const { response } = await request
      .post(`${url}/api/automation/is-number`)
      .then((res) => res.json())

    // THEN
    expect(response.isNumber).toBeTruthy()
  })

  test('should run a javascript code with the services.date.format helper', async ({ request }) => {
    // GIVEN
    const config: Config = {
      name: 'App',
      automations: [
        {
          name: 'getDate',
          trigger: {
            event: 'ApiCalled',
            path: 'get-date',
            output: {
              date: {
                value: '{{runJavascriptCode.date}}',
                type: 'string',
              },
            },
          },
          actions: [
            {
              service: 'Code',
              action: 'RunJavascript',
              name: 'runJavascriptCode',
              code: js`
                  const date = services.date.format(new Date(2024, 8, 1), 'yyyy-MM-dd')
                  return { date }
                `,
            },
          ],
        },
      ],
    }
    const app = new App()
    const url = await app.start(config)

    // WHEN
    const { response } = await request
      .post(`${url}/api/automation/get-date`)
      .then((res) => res.json())

    // THEN
    expect(response.date).toBe('2024-09-01')
  })
})