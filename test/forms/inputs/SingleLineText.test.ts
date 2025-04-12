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
              field: 'single_line_text',
              label: 'Single Line Text',
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
      const table = drivers.database.tableFromSchema(config.tables![0])
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

    it('should not submit the form if the text input is empty', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const singleLineText = ''

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', singleLineText)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="single_line_text"]', (input) =>
        input.checkValidity()
      )

      // THEN
      expect(isValid).toBe(false)
    })

    it('should not submit the form if the text input is too short', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const singleLineText = 'sho'

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', singleLineText)
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="single_line_text"]', (input) =>
        input.checkValidity()
      )

      // THEN
      expect(isValid).toBe(false)
    })

    it('should submit the form with a text limited to maxLength', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(config.tables![0])
      const singleLineText =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.'

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', singleLineText)
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.single_line_text).toBe('Lorem ipsum dolor sit amet con')
    })
  })
})
