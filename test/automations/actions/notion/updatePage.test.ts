import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import { notionTableSample1 } from '/infrastructure/integrations/bun/mocks/notion/NotionTableIntegration.mock'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Notion'] }, ({ app, request, integrations }) => {
  describe('on POST', () => {
    it('should update a page', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
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
