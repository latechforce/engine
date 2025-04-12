import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      engine: '1.0.0',
      forms: [
        {
          name: 'form',
          path: 'path',
          table: 'table',
          inputs: [
            {
              field: 'email',
              label: 'Email',
            },
          ],
        },
      ],
      tables: [
        {
          name: 'table',
          fields: [
            {
              name: 'email',
              type: 'Email',
              required: true,
            },
          ],
        },
      ],
    }

    it('should display the email input', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Email')
    })

    it('should create a record with an email input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(config.tables![0])
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="email"]', 'john.doe@example.com')
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.email).toBe('john.doe@example.com')
    })

    it('should not submit the form if the email input is empty', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const email = ''

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="email"]', email)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="email"]', (input) => input.checkValidity())

      // THEN
      expect(isValid).toBe(false)
    })
  })
})
