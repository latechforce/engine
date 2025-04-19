import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configFormInputEmail } from '/examples/config/form/input/email'
import { configFormInputEmailRequired } from '/examples/config/form/input/email/required'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    it('should display the email input', async () => {
      // GIVEN
      const { url } = await app.start(configFormInputEmail)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Email')
    })

    it('should create a record with an email input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(configFormInputEmail.tables![0])
      const { url } = await app.start(configFormInputEmail)

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
      const { url } = await app.start(configFormInputEmailRequired)
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
