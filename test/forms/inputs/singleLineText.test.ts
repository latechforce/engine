import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configFormInputSingleLineText } from '/examples/config/form/input/singleLineText'
import { configFormInputSingleLineTextRequired } from '/examples/config/form/input/singleLineText/required'
import { configFormInputSingleLineTextMinLength } from '/examples/config/form/input/singleLineText/minLength'
import { configFormInputSingleLineTextMaxLength } from '/examples/config/form/input/singleLineText/maxLength'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    it('should display the text input', async () => {
      // GIVEN
      const { url } = await app.start(configFormInputSingleLineText)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Single Line Text')
    })

    it('should create a record with a text input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(configFormInputSingleLineText.tables![0])
      const { url } = await app.start(configFormInputSingleLineText)

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
      const { url } = await app.start(configFormInputSingleLineTextRequired)
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
      const { url } = await app.start(configFormInputSingleLineTextMinLength)
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
      const { url } = await app.start(configFormInputSingleLineTextMaxLength)
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(
        configFormInputSingleLineTextMaxLength.tables![0]
      )
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
