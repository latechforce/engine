import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationSchema, getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Notion'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on page in table created', () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getFirstTableSchema(),
        ...getAutomationSchema('FirstNotionTablePageCreated'),
      }
      const table = await integrations.notion.addTableFromSchema(config.tables[0])
      await app.start(config)

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
      const config = {
        ...getFirstTableSchema(),
        ...getAutomationSchema('FirstNotionTablePageCreated'),
      }
      const table = await integrations.notion.addTableFromSchema(config.tables[0])
      await app.start(config)

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
      const config = {
        ...getFirstTableSchema(['Champs avec charactères (spéciaux)']),
        ...getAutomationSchema('FirstNotionTablePageCreated'),
      }
      const table = await integrations.notion.addTableFromSchema(config.tables[0])
      await app.start(config)

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
