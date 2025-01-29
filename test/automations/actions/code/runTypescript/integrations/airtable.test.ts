import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { airtableTableSample1 } from '/infrastructure/integrations/bun/mocks/airtable/AirtableTableIntegration.mock'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Airtable'] }, ({ app, request, integrations }) => {
  beforeEach(async () => {
    await integrations.airtable.addTable(airtableTableSample1.name, airtableTableSample1.fields)
  })

  describe('on POST', () => {
    it('should run a Typescript code with a Airtable database record insert', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
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
                env: {
                  TEST_AIRTABLE_TABLE_1_ID: airtableTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ name: string }>) {
                  const { inputData, integrations, env } = context
                  const { name } = inputData
                  const { airtable } = integrations
                  const table = await airtable.getTable(env.TEST_AIRTABLE_TABLE_1_ID)
                  const user = await table.insert({ name })
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
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const user = await table.retrieve(response.user.id)
      expect(response.user.fields.name).toBe('John')
      expect(user.fields.name).toBe('John')
    })

    it('should run a Typescript code with a Airtable database record update', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
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
                env: {
                  TEST_AIRTABLE_TABLE_1_ID: airtableTableSample1.name,
                },
                code: String(async function (
                  context: CodeRunnerContext<{ id: string; name: string }>
                ) {
                  const { inputData, integrations, env } = context
                  const { name, id } = inputData
                  const { airtable } = integrations
                  const table = await airtable.getTable(env.TEST_AIRTABLE_TABLE_1_ID)
                  const user = await table.update(id, { name })
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const { id } = await table.insert({ name: 'John' })

      // WHEN
      const response = await request.post(`${url}/api/automation/update-user`, {
        id,
        name: 'John Doe',
      })

      // THEN
      const user = await table.retrieve(response.user.id)
      expect(response.user.fields.name).toBe('John Doe')
      expect(user.fields.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Airtable database record retrieve', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
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
                env: {
                  TEST_AIRTABLE_TABLE_1_ID: airtableTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, integrations, env } = context
                  const { airtable } = integrations
                  const { id } = inputData
                  type User = { name: string }
                  const table = await airtable.getTable<User>(env.TEST_AIRTABLE_TABLE_1_ID)
                  const user = await table.retrieve(id)
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const { id } = await table.insert({ name: 'John Doe' })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-user`, {
        id,
      })

      // THEN
      expect(response.user.fields.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Airtable database record delete', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        automations: [
          {
            name: 'deleteUser',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'delete-user',
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
                env: {
                  TEST_AIRTABLE_TABLE_1_ID: airtableTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, integrations, env } = context
                  const { airtable } = integrations
                  const { id } = inputData
                  const table = await airtable.getTable(env.TEST_AIRTABLE_TABLE_1_ID)
                  await table.delete(id)
                  const user = await table.retrieve(id)
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const { id } = await table.insert({ name: 'John Doe' })

      // WHEN
      const response = await request.post(`${url}/api/automation/delete-user`, {
        id,
      })

      // THEN
      expect(response.user).toBeUndefined()
    })

    it('should run a Typescript code with a Airtable database record list', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        automations: [
          {
            name: 'listUsers',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'list-users',
              input: {
                type: 'object',
                properties: {
                  ids: { type: 'array', items: { type: 'string' } },
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
                  ids: {
                    json: '{{trigger.body.ids}}',
                  },
                },
                env: {
                  TEST_AIRTABLE_TABLE_1_ID: airtableTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ ids: string[] }>) {
                  const { airtable } = context.integrations
                  const { ids } = context.inputData
                  type User = { name: string }
                  const table = await airtable.getTable<User>(context.env.TEST_AIRTABLE_TABLE_1_ID)
                  const users = await table.list({
                    field: 'id',
                    operator: 'IsAnyOf',
                    value: ids,
                  })
                  return { users }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const users = await table.insertMany([
        { name: 'John Doe' },
        { name: 'John Wick' },
        { name: 'John Connor' },
      ])

      // WHEN
      const response = await request.post(`${url}/api/automation/list-users`, {
        ids: users.map((user) => user.id),
      })

      // THEN
      expect(response.users).toHaveLength(3)
      const names = response.users.map((user: { fields: { name: string } }) => user.fields.name)
      expect(names).toContain('John Doe')
      expect(names).toContain('John Wick')
      expect(names).toContain('John Connor')
    })

    it('should run a Typescript code with a Airtable database record and a title field', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        automations: [
          {
            name: 'readField',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-field',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                field: '{{runJavascriptCode.field}}',
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
                env: {
                  TEST_AIRTABLE_TABLE_1_ID: airtableTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, integrations, env } = context
                  const { airtable } = integrations
                  const { id } = inputData
                  const table = await airtable.getTable(env.TEST_AIRTABLE_TABLE_1_ID)
                  const record = await table.retrieve(id)
                  if (!record) throw new Error('Record not found')
                  const field: string | null = record.getTitle('name')
                  return { field }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const { id } = await table.insert({ name: 'John Doe' })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-field`, {
        id,
      })

      // THEN
      expect(response.field).toBe('John Doe')
    })
  })
})
