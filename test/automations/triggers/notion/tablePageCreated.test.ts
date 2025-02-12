// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getAutomationConfig, getFirstTableConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp(
  { drivers: ['Database'], integrations: ['Notion'] },
  ({ app, drivers, integrations }) => {
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
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const { rows: histories } = await drivers.database.query(
          'SELECT * FROM automations_histories_view'
        )
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
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const {
          rows: [history],
        } = await drivers.database.query<{ trigger_data: string }>(
          'SELECT * FROM automations_histories_view'
        )
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
        await new Promise((resolve) => setTimeout(resolve, 2000))
        const {
          rows: [history],
        } = await drivers.database.query<{ trigger_data: string }>(
          'SELECT * FROM automations_histories_view'
        )
        const triggerData = JSON.parse(history.trigger_data)
        expect(triggerData['Champs avec charactères (spéciaux)']).toBe('value')
      })
    })
  }
)
