import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import {
  notionTableSample1,
  notionTableSample2,
  notionUserSample,
} from '/infrastructure/integrations/bun/mocks/notion/NotionTableIntegration.mock'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Notion'] }, ({ app, request, integrations }) => {
  beforeEach(async () => {
    await integrations.notion.addTable(notionTableSample1.name, notionTableSample1.fields)
    await integrations.notion.addTable(notionTableSample2.name, notionTableSample2.fields)
    await integrations.notion.addUser(notionUserSample)
  })

  describe('on POST', () => {
    it('should update a page', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
})
