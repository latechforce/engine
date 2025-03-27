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
              field: 'long_text',
              label: 'Long Text',
              required: true,
              minLength: 10,
              maxLength: 100,
            },
          ],
        },
      ],
      tables: [
        {
          name: 'table',
          fields: [
            {
              name: 'long_text',
              type: 'LongText',
            },
          ],
        },
      ],
    }

    it('should display the textarea', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Long Text')
    })

    it('should create a record with a textarea', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.table(config.tables![0])
      const { url } = await app.start(config)
      const longText =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet.'

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('textarea[name="long_text"]', longText)
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.long_text).toBe(longText)
    })

    it('should not submit the form if the textarea is empty', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const longText = ''

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('textarea[name="long_text"]', longText)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('textarea[name="long_text"]', (input) =>
        input.checkValidity()
      )

      // THEN
      expect(isValid).toBe(false)
    })

    it('should not submit the form if the text is too short', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const longText = 'short'

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('textarea[name="long_text"]', longText)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('textarea[name="long_text"]', (input) =>
        input.checkValidity()
      )

      // THEN
      expect(isValid).toBe(false)
    })

    it('should submit the form with a text limited to maxLength', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const table = drivers.database.table(config.tables![0])
      const longText =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.'

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('textarea[name="long_text"]', longText)
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.long_text).toBe(
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet '
      )
    })
  })
})
