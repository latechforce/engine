import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configFormTitle } from '/examples/config/form/title'
import { configFormDescription } from '/examples/config/form/description'
import { configForm } from '/examples/config/form'
import { configFormSubmitLabel } from '/examples/config/form/submitLabel'
import { configFormWithAutomation } from '/examples/config/form/withAutomation'
import { configFormSuccessMessage } from '/examples/config/form/successMessage'
import { configFormInputSingleLineTextRequired } from '/examples/config/form/input/singleLineText/required'
import { configFormInputRequiredFromField } from '/examples/config/form/input/requiredFromField'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    it('should display the form title', async () => {
      // GIVEN
      const { url } = await app.start(configFormTitle)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.title()).resolves.toBe('Form title')
      expect(page.content()).resolves.toContain('Form title')
    })

    it('should display the form description', async () => {
      // GIVEN
      const { url } = await app.start(configFormDescription)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Form description')
    })

    it('should display the form inputs', async () => {
      // GIVEN
      const { url } = await app.start(configForm)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Single Line Text')
    })

    it('should display the form submit button', async () => {
      // GIVEN
      const { url } = await app.start(configFormSubmitLabel)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Save')
    })

    it('should display a success message when the form is submitted', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configFormSuccessMessage)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('Success')

      // THEN
      const html = await page.content()
      expect(html).toContain('Success')
    })

    it('should create a record when the form is submitted', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(configFormSuccessMessage.tables![0])
      const { url } = await app.start(configFormSuccessMessage)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('Success')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.single_line_text).toBe('John Doe')
    })

    it('should start an automation when the form is submitted', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configFormWithAutomation)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('Form submitted successfully!')

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
      expect(histories[0].actions_data).toContain('Automation triggered: John Doe')
    })

    it('should not submit the form if the required field is empty', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configFormInputSingleLineTextRequired)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', '')
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="single_line_text"]', (input) =>
        input.checkValidity()
      )

      // THEN
      expect(isValid).toBe(false)
    })

    it('should not submit the form if the required field from a field is empty', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configFormInputRequiredFromField)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.type('input[name="single_line_text"]', '')
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="single_line_text"]', (input) =>
        input.checkValidity()
      )

      // THEN
      expect(isValid).toBe(false)
    })
  })
})
