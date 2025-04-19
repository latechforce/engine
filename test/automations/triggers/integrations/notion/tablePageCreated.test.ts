import Tester, { expect, describe, it, beforeAll, afterAll } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationTriggerIntegrationNotionTablePageCreated } from '/examples/config/automation/trigger/integration/notion/tablePageCreated'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Notion'] })

mock.request(({ app, drivers, integrations }) => {
  beforeAll(async () => {
    process.env.NOTION_TABLE_ID = 'table_1'
  })

  afterAll(async () => {
    delete process.env.NOTION_TABLE_ID
  })

  describe('on page in table created', () => {
    it('should start an automation', async () => {
      // GIVEN
      const table = await integrations.notion.addTableFromSchema({
        name: 'table_1',
        fields: [
          {
            name: 'name',
            type: 'SingleLineText',
          },
        ],
      })
      await app.start(configAutomationTriggerIntegrationNotionTablePageCreated)

      // WHEN
      await table.insert({
        name: 'My new page',
      })

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
    })

    it('should return the created time of the created page', async () => {
      // GIVEN
      const table = await integrations.notion.addTableFromSchema({
        name: 'table_1',
        fields: [
          {
            name: 'name',
            type: 'SingleLineText',
          },
        ],
      })
      await app.start(configAutomationTriggerIntegrationNotionTablePageCreated)

      // WHEN
      await table.insert({
        name: 'My new page',
      })

      // THEN
      const [history] = await drivers.database.waitForAutomationsHistories()
      const triggerData = JSON.parse(history.trigger_data)
      expect(triggerData.createdTime).toBeDefined()
    })

    it('should return a property with specials characteres of the created page', async () => {
      // GIVEN
      const table = await integrations.notion.addTableFromSchema({
        name: 'table_1',
        fields: [
          {
            name: 'Champs avec charactères (spéciaux)',
            type: 'SingleLineText',
          },
        ],
      })
      await app.start(configAutomationTriggerIntegrationNotionTablePageCreated)

      // WHEN
      await table.insert({
        'Champs avec charactères (spéciaux)': 'value',
      })

      // THEN
      const [history] = await drivers.database.waitForAutomationsHistories()
      const triggerData = JSON.parse(history.trigger_data)
      expect(triggerData.properties['Champs avec charactères (spéciaux)']).toBe('value')
    })
  })
})
