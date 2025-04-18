import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    const config: Config = {
      name: 'App',
      forms: [
        {
          name: 'form',
          path: 'path',
          table: 'table',
          inputs: [
            {
              field: 'url',
              label: 'Url',
              required: true,
              minLength: 5,
              maxLength: 30,
            },
          ],
        },
      ],
      tables: [
        {
          name: 'table',
          fields: [
            {
              name: 'url',
              type: 'Url',
            },
          ],
        },
      ],
    }

    it('should display the url input', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Url')
    })

    it('should create a record with a url input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(config.tables![0])
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="url"]', 'https://www.google.com')
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.url).toBe('https://www.google.com')
    })

    it('should not submit the form if the text input is empty', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const urlText = ''

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="url"]', urlText)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="url"]', (input) => input.checkValidity())

      // THEN
      expect(isValid).toBe(false)
    })
  })
})
