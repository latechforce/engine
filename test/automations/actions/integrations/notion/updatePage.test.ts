import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import {
  notionTableSample1,
  notionTableSample2,
  notionTableSample3,
  notionUserSample,
} from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Notion'] })

mock.request(({ app, request, integrations, drivers }) => {
  beforeEach(async () => {
    await integrations.notion.addTable(notionTableSample1.name, notionTableSample1.fields)
    await integrations.notion.addTable(notionTableSample2.name, notionTableSample2.fields)
    await integrations.notion.addTable(notionTableSample3.name, notionTableSample3.fields)
    await integrations.notion.addUser(notionUserSample)
  })

  describe('on POST', () => {
    it('should update a page', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        engine: '1.0.0',
        automations: [
          {
            name: 'updatePage',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'update-page',
              input: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                },
              },
            },
            actions: [
              {
                name: 'updatePage',
                integration: 'Notion',
                action: 'UpdatePage',
                table: notionTableSample1.name,
                id: '{{trigger.body.id}}',
                page: {
                  name: 'John Doe',
                },
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const { id } = await table.insert({ name: 'John' })

      // WHEN
      await request.post(`${url}/api/automation/update-page`, {
        id,
      })

      // THEN
      const response = await table.retrieve(id)
      expect(response.properties.name).toBe('John Doe')
    })
  })

  describe('on Notion Table Page Created', () => {
    it('should update a page with properties with specials characters', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        engine: '1.0.0',
        automations: [
          {
            name: 'updatePage',
            trigger: {
              integration: 'Notion',
              event: 'TablePageCreated',
              table: notionTableSample3.name,
            },
            actions: [
              {
                name: 'updatePage',
                integration: 'Notion',
                action: 'UpdatePage',
                table: notionTableSample3.name,
                id: '{{trigger.id}}',
                page: {
                  '[App] Nom': '{{lookup trigger.properties "[App] Nom" }} updated',
                },
              },
            ],
          },
        ],
      }
      const table = await integrations.notion.getTable(notionTableSample3.name)
      await app.start(config)

      // WHEN
      await table.insert({ '[App] Nom': 'App' })

      // THEN
      const [history] = await drivers.database.waitForAutomationsHistories()
      const [actionData] = JSON.parse(history.actions_data)
      expect(actionData.output.properties['[App] Nom']).toBe('App updated')
    })
  })
})
