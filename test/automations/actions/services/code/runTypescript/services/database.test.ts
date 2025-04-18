import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import type { TableSchema } from '/adapter/api/schemas/TableSchema'

const mock = new Mock(Tester, { drivers: ['Database', 'Storage'] })

mock.request(({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should run a Typescript code with a database insert', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'createUser',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-user',
              input: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
              },
              output: {
                user: {
                  json: '{{runJavascriptCode.user}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  name: '{{trigger.body.name}}',
                },
                code: String(async function (context: CodeRunnerContext<{ name: string }>) {
                  const { inputData, services } = context
                  const { name } = inputData
                  const { database } = services
                  const user = await database.table('users').insert({ name })
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-user`, {
        name: 'John',
      })

      // THEN
      const user = await drivers.database.tableFromSchema(table).readById(response.user.id)
      expect(response.user.fields.name).toBe('John')
      expect(user?.fields.name).toBe('John')
    })

    it('should run a Typescript code with a database many insert', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',

        tables: [{ name: 'users', fields: [{ name: 'name', type: 'SingleLineText' }] }],
        automations: [
          {
            name: 'createUsers',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-users',
              input: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
              },
              output: {
                users: {
                  json: '{{runJavascriptCode.users}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  name: '{{trigger.body.name}}',
                },
                code: String(async function (context: CodeRunnerContext<{ name: string }>) {
                  const { inputData, services } = context
                  const { name } = inputData
                  const { database } = services
                  const users = await database.table('users').insertMany([{ name }, { name }])
                  return { users }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-users`, {
        name: 'John',
      })

      // THEN
      expect(response.users).toHaveLength(2)
      expect(response.users[0].fields.name).toBe('John')
      expect(response.users[1].fields.name).toBe('John')
    })

    it('should run a Typescript code with a database update', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'updateUser',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'update-user',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                },
              },
              output: {
                user: {
                  json: '{{runJavascriptCode.user}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                  name: '{{trigger.body.name}}',
                },
                code: String(async function (
                  context: CodeRunnerContext<{ id: string; name: string }>
                ) {
                  const { inputData, services } = context
                  const { name, id } = inputData
                  const { database } = services
                  const user = await database.table('users').update(id, { name })
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { name: 'John' }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/update-user`, {
        id: '1',
        name: 'John Doe',
      })

      // THEN
      const user = await drivers.database.tableFromSchema(table).readById(response.user.id)
      expect(response.user.fields.name).toBe('John Doe')
      expect(user?.fields.name).toBe('John Doe')
    })

    it('should run a Typescript code with a database many update', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'updateUsers',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'update-users',
              input: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
              },
              output: {
                users: {
                  json: '{{runJavascriptCode.users}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  name: '{{trigger.body.name}}',
                },
                code: String(async function (context: CodeRunnerContext<{ name: string }>) {
                  const { inputData, services } = context
                  const { name } = inputData
                  const { database } = services
                  const users = await database.table('users').updateMany([
                    { id: '1', fields: { name } },
                    { id: '2', fields: { name } },
                  ])
                  return { users }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { name: 'John' }, created_at: new Date().toISOString() })
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '2', fields: { name: 'John' }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/update-users`, {
        name: 'John Doe',
      })

      // THEN
      expect(response.users.length).toBe(2)
      expect(response.users[0].fields.name).toBe('John Doe')
      expect(response.users[1].fields.name).toBe('John Doe')
    })

    it('should run a Typescript code with a database read', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'readUser',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-user',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                user: {
                  json: '{{runJavascriptCode.user}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, services } = context
                  const { database } = services
                  const { id } = inputData
                  type User = { name: string }
                  const user = await database.table<User>('users').read({
                    field: 'id',
                    operator: 'Is',
                    value: id,
                  })
                  return { user: user?.fields }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { name: 'John Doe' }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-user`, {
        id: '1',
      })

      // THEN
      expect(response.user.name).toBe('John Doe')
    })

    it('should run a Typescript code with a database read by id', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'readUser',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-user',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                user: {
                  json: '{{runJavascriptCode.user}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, services } = context
                  const { database } = services
                  const { id } = inputData
                  type User = { name: string }
                  const user = await database.table<User>('users').readById(id)
                  return { user: user?.fields }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { name: 'John Doe' }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-user`, {
        id: '1',
      })

      // THEN
      expect(response.user.name).toBe('John Doe')
    })

    it('should run a Typescript code with a database read file by id', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'attachments', type: 'MultipleAttachment' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'readFile',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-file',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                file: {
                  json: '{{runJavascriptCode.file}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, services } = context
                  const { database } = services
                  const { id } = inputData
                  const file = await database.table('users').readFileById(id)
                  return { file: file?.toAttachment() }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.storage.bucket('table_users_attachments').save({
        id: '1',
        name: 'test.txt',
        data: Buffer.from('test'),
        created_at: new Date(),
        mime_type: 'text/plain',
      })
      await drivers.database.tableFromSchema(table).insert({
        id: '1',
        fields: {
          attachments: [
            {
              id: '1',
              name: 'test.txt',
              mime_type: 'text/plain',
              url: 'https://example.com/test.txt',
              created_at: new Date().toISOString(),
            },
          ],
        },
        created_at: new Date().toISOString(),
      })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-file`, {
        id: '1',
      })

      // THEN
      expect(response.file.name).toBe('test.txt')
    })

    it('should run a Typescript code with a database read with a string field', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'readName',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-name',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                name: '{{runJavascriptCode.name}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, services } = context
                  const { database } = services
                  const { id } = inputData
                  const user = await database.table('users').readById(id)
                  return { name: user?.getFieldAsString('name') }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { name: 'John Doe' }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-name`, {
        id: '1',
      })

      // THEN
      expect(response.name).toBe('John Doe')
    })

    it('should run a Typescript code with a database read with a number field', async () => {
      // GIVEN
      const table: TableSchema = { name: 'users', fields: [{ name: 'age', type: 'Number' }] }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'readAge',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-age',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                age: {
                  number: '{{runJavascriptCode.age}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, services } = context
                  const { database } = services
                  const { id } = inputData
                  const user = await database.table('users').readById(id)
                  return { age: user?.getFieldAsNumber('age') }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { age: 35 }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-age`, {
        id: '1',
      })

      // THEN
      expect(response.age).toBe(35)
    })

    it('should run a Typescript code with a database read with a boolean field', async () => {
      // GIVEN
      const table: TableSchema = { name: 'users', fields: [{ name: 'valid', type: 'Checkbox' }] }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'readValid',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-valid',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                valid: {
                  boolean: '{{runJavascriptCode.valid}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, services } = context
                  const { database } = services
                  const { id } = inputData
                  const user = await database.table('users').readById(id)
                  return { valid: user?.getFieldAsBoolean('valid') }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { valid: true }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-valid`, {
        id: '1',
      })

      // THEN
      expect(response.valid).toBeTruthy()
    })

    it('should run a Typescript code with a database read with a Date field', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'birthdate', type: 'DateTime' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'readBirthdate',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-birthdate',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                birthdate: '{{runJavascriptCode.birthdate}}',
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  id: '{{trigger.body.id}}',
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, services } = context
                  const { database } = services
                  const { id } = inputData
                  const user = await database.table('users').readById(id)
                  return { birthdate: user?.getFieldAsDate('birthdate')?.toISOString() }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const birthdate = new Date()
      await drivers.database
        .tableFromSchema(table)
        .insert({ id: '1', fields: { birthdate }, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-birthdate`, {
        id: '1',
      })

      // THEN
      expect(response.birthdate).toBe(birthdate.toISOString())
    })

    it('should run a Typescript code with a database list', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'listUsers',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'list-users',
              output: {
                users: {
                  json: '{{runJavascriptCode.users}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { database } = context.services
                  type User = { name: string }
                  const users = await database.table<User>('users').list()
                  return { users: users.map((user) => user.fields) }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database.tableFromSchema(table).insertMany([
        { id: '1', fields: { name: 'John Doe' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'John Wick' }, created_at: new Date().toISOString() },
        { id: '3', fields: { name: 'John Connor' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const response = await request.post(`${url}/api/automation/list-users`, {
        id: '1',
      })

      // THEN
      expect(response.users).toHaveLength(3)
      expect(response.users[0].name).toBe('John Doe')
      expect(response.users[1].name).toBe('John Wick')
      expect(response.users[2].name).toBe('John Connor')
    })

    it('should run a Typescript code with a database list with is filter', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'listUsers',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'list-users',
              output: {
                users: {
                  json: '{{runJavascriptCode.users}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { database } = context.services
                  const users = await database.table('users').list({
                    field: 'id',
                    operator: 'Is',
                    value: '2',
                  })
                  return { users: users.map((user) => user.fields) }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database.tableFromSchema(table).insertMany([
        { id: '1', fields: { name: 'John Doe' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'John Wick' }, created_at: new Date().toISOString() },
        { id: '3', fields: { name: 'John Connor' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const response = await request.post(`${url}/api/automation/list-users`)

      // THEN
      expect(response.users).toHaveLength(1)
      expect(response.users[0].name).toBe('John Wick')
    })

    it('should run a Typescript code with a database list with isAnyOf filter', async () => {
      // GIVEN
      const table: TableSchema = {
        name: 'users',
        fields: [{ name: 'name', type: 'SingleLineText' }],
      }
      const config: Config = {
        name: 'App',

        tables: [table],
        automations: [
          {
            name: 'listUsers',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'list-users',
              output: {
                users: {
                  json: '{{runJavascriptCode.users}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { database } = context.services
                  const users = await database.table('users').list({
                    field: 'id',
                    operator: 'IsAnyOf',
                    value: ['3', '2'],
                  })
                  return { users: users.map((user) => user.fields) }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      await drivers.database.tableFromSchema(table).insertMany([
        { id: '1', fields: { name: 'John Doe' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'John Wick' }, created_at: new Date().toISOString() },
        { id: '3', fields: { name: 'John Connor' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const response = await request.post(`${url}/api/automation/list-users`)

      // THEN
      expect(response.users).toHaveLength(2)
      expect(response.users[0].name).toBe('John Wick')
      expect(response.users[1].name).toBe('John Connor')
    })
  })
})
