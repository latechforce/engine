import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import {
  notionTableSample1,
  notionTableSample2,
  notionUserSample,
} from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Notion'] }, ({ app, request, integrations }) => {
  beforeEach(async () => {
    await integrations.notion.addTable(notionTableSample1.name, notionTableSample1.fields)
    await integrations.notion.addTable(notionTableSample2.name, notionTableSample2.fields)
    await integrations.notion.addUser(notionUserSample)
  })

  describe('on POST', () => {
    it('should run a Typescript code with a Notion database page insert', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
                  TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ name: string }>) {
                  const { inputData, integrations, env } = context
                  const { name } = inputData
                  const { notion } = integrations
                  const table = await notion.getTable(env.TEST_NOTION_TABLE_1_ID)
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
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const user = await table.retrieve(response.user.id)
      expect(response.user.properties.name).toBe('John')
      expect(user.properties.name).toBe('John')
    })

    it('should run a Typescript code with a Notion database page update', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
                  TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
                },
                code: String(async function (
                  context: CodeRunnerContext<{ id: string; name: string }>
                ) {
                  const { inputData, integrations, env } = context
                  const { name, id } = inputData
                  const { notion } = integrations
                  const table = await notion.getTable(env.TEST_NOTION_TABLE_1_ID)
                  const user = await table.update(id, { name })
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const { id } = await table.insert({ name: 'John' })

      // WHEN
      const response = await request.post(`${url}/api/automation/update-user`, {
        id,
        name: 'John Doe',
      })

      // THEN
      const user = await table.retrieve(response.user.id)
      expect(response.user.properties.name).toBe('John Doe')
      expect(user.properties.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Notion database page retrieve', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
                  TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, integrations, env } = context
                  const { notion } = integrations
                  const { id } = inputData
                  type User = { name: string }
                  const table = await notion.getTable<User>(env.TEST_NOTION_TABLE_1_ID)
                  const user = await table.retrieve(id)
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const { id } = await table.insert({ name: 'John Doe' })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-user`, {
        id,
      })

      // THEN
      expect(response.user.properties.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Notion database page archive', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
                  TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, integrations, env } = context
                  const { notion } = integrations
                  const { id } = inputData
                  const table = await notion.getTable(env.TEST_NOTION_TABLE_1_ID)
                  await table.archive(id)
                  const user = await table.retrieve(id)
                  return { user }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const { id } = await table.insert({ name: 'John Doe' })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-user`, {
        id,
      })

      // THEN
      expect(response.user.archived).toBeTruthy()
    })

    it('should run a Typescript code with a Notion database page list', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
                  TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ ids: string[] }>) {
                  const { notion } = context.integrations
                  const { ids } = context.inputData
                  type User = { name: string }
                  const table = await notion.getTable<User>(context.env.TEST_NOTION_TABLE_1_ID)
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
      const table = await integrations.notion.getTable(notionTableSample1.name)
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
      const names = response.users.map(
        (user: { properties: { name: string } }) => user.properties.name
      )
      expect(names).toContain('John Doe')
      expect(names).toContain('John Wick')
      expect(names).toContain('John Connor')
    })

    it('should run a Typescript code with a Notion database page and a title property', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'readProperty',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'read-property',
              input: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
              },
              output: {
                property: '{{runJavascriptCode.property}}',
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
                  TEST_NOTION_TABLE_1_ID: notionTableSample1.name,
                },
                code: String(async function (context: CodeRunnerContext<{ id: string }>) {
                  const { inputData, integrations, env } = context
                  const { notion } = integrations
                  const { id } = inputData
                  const table = await notion.getTable(env.TEST_NOTION_TABLE_1_ID)
                  const page = await table.retrieve(id)
                  if (!page) throw new Error('Page not found')
                  const property: string | null = page.getTitle('name')
                  return { property }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const { id } = await table.insert({ name: 'John Doe' })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-property`, {
        id,
      })

      // THEN
      expect(response.property).toBe('John Doe')
    })

    it('should run a Typescript code with a Notion users list', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
                  const { integrations } = context
                  const { notion } = integrations
                  const users = await notion.listAllUsers()
                  return { users }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/list-users`)

      // THEN
      expect(response.users.length > 0).toBeTruthy()
    })
  })
})
