import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      forms: [
        {
          name: 'form',
          path: 'path',
          table: 'table',
          inputs: [
            {
              field: 'single_select',
              label: 'Single Select',
            },
          ],
        },
      ],
      tables: [
        {
          name: 'table',
          fields: [
            {
              name: 'single_select',
              type: 'SingleSelect',
              options: ['Option 1', 'Option 2', 'Option 3'],
            },
          ],
        },
      ],
    }

    it('should display the single select input', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Single Select')
    })

    it('should create a record with a single select input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.table(config.tables![0])
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.select('select[name="single_select"]', 'Option 3')
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.single_select).toBe('Option 3')
    })

    it('should create a record with an empty select input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.table(config.tables![0])
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.single_select).toBe(null)
    })
  })
})
