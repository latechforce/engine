import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock } from '/test/bun'
import {
  notionTableSample1,
  notionTableSample2,
  notionTableSample3,
  notionUserSample,
} from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'
import {
  configAutomationActionIntegrationNotionUpdatePage,
  configAutomationActionIntegrationNotionUpdatePageWithSpecialCharacters,
} from '/examples/config/automation/action/integration/notion/updatePage'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Notion'] })

mock.request(({ app, request, integrations, drivers }) => {
  beforeEach(async () => {
    await integrations.notion.addTableFromSchema(notionTableSample1)
    await integrations.notion.addTableFromSchema(notionTableSample2)
    await integrations.notion.addTableFromSchema(notionTableSample3)
    await integrations.notion.addUser(notionUserSample)
  })

  describe('on POST', () => {
    it('should update a page', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionIntegrationNotionUpdatePage)
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const insertResponse = await table.insert({ name: 'John' })
      if (insertResponse.error) {
        throw new Error(insertResponse.error.message)
      }
      const { id } = insertResponse.data

      // WHEN
      await request.post(`${url}/api/automation/update-page`, {
        id,
      })

      // THEN
      const response = await table.retrieve(id)
      if (response.error) {
        throw new Error(response.error.message)
      }
      expect(response.data.properties.name).toBe('John Doe')
    })
  })

  describe('on Notion Table Page Created', () => {
    it('should update a page with properties with specials characters', async () => {
      // GIVEN
      const table = await integrations.notion.getTable(notionTableSample3.name)
      await app.start(configAutomationActionIntegrationNotionUpdatePageWithSpecialCharacters)

      // WHEN
      await table.insert({ '[App] Nom': 'App' })

      // THEN
      const [history] = await drivers.database.waitForAutomationsHistories()
      const [actionData] = JSON.parse(history.actions_data)
      expect(actionData.output.properties['[App] Nom']).toBe('App updated')
    })
  })
})
