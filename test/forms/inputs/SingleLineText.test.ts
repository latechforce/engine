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
              field: 'single_line_text',
              label: 'Single Line Text',
            },
          ],
        },
      ],
      tables: [
        {
          name: 'table',
          fields: [
            {
              name: 'single_line_text',
              type: 'SingleLineText',
            },
          ],
        },
      ],
    }

    it('should display the text input', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Single Line Text')
    })

    it('should create a record with a text input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.table(config.tables![0])
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.single_line_text).toBe('John Doe')
    })
  })
})
