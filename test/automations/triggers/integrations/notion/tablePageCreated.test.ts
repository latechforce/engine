import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationConfig, getFirstTableConfig } from '/test/config'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Notion'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on page in table created', () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getFirstTableConfig(),
        ...getAutomationConfig('FirstNotionTablePageCreated'),
      }
      const table = await integrations.notion.addTable(
        config.tables[0].name,
        config.tables[0].fields
      )
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
        ...getFirstTableConfig(),
        ...getAutomationConfig('FirstNotionTablePageCreated'),
      }
      const table = await integrations.notion.addTable(
        config.tables[0].name,
        config.tables[0].fields
      )
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
        ...getFirstTableConfig(['Champs avec charactères (spéciaux)']),
        ...getAutomationConfig('FirstNotionTablePageCreated'),
      }
      const table = await integrations.notion.addTable(
        config.tables[0].name,
        config.tables[0].fields
      )
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
