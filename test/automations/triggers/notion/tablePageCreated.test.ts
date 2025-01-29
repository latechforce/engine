// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getAutomationConfig, getFirstTableConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp(
  { drivers: ['Database'], integrations: ['Notion'] },
  ({ app, drivers, integrations }) => {
    describe.skip('on page in table created', () => {
      it('should start an automation', async () => {
        // GIVEN
        const config = {
          ...getFirstTableConfig(),
          ...getAutomationConfig('TablePageCreated'),
        }
        await app.start({ ...config, loggers: [{ driver: 'Console', level: 'debug' }] })

        // WHEN
        const table = await integrations.notion.getTable(config.tables[0].name)
        await table.insert({
          name: 'My new page',
        })

        // THEN
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const { rows: histories } = await drivers.database.query(
          'SELECT * FROM _automations_histories_view'
        )
        expect(histories).toHaveLength(1)
      })

      it('should return a date property of the created page', async () => {
        // GIVEN
        const config = {
          ...getFirstTableConfig(),
          ...getAutomationConfig('TablePageCreated'),
        }
        await app.start(config)

        // WHEN
        const table = await integrations.notion.getTable(config.tables[0].name)
        await table.insert({
          name: 'My new page',
        })

        // THEN
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const {
          rows: [history],
        } = await drivers.database.query<{ trigger_data: string }>(
          'SELECT * FROM _automations_histories_view'
        )
        const triggerData = JSON.parse(history.trigger_data)
        expect(triggerData.created_time).toBeDefined()
      })
    })
  }
)
