import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { title } from '/examples/config/form/title'
import { description } from '/examples/config/form/description'
import { form } from '/examples/config/form'
import { submitLabel } from '/examples/config/form/submitLabel'
import { withAutomation } from '/examples/config/form/withAutomation'
import { successMessage } from '/examples/config/form/successMessage'
import { required } from '/examples/config/form/input/required'
import { requiredFromField } from '/examples/config/form/input/requiredFromField'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    it('should display the form title', async () => {
      // GIVEN
      const { url } = await app.start(title)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.title()).resolves.toBe('Form title')
      expect(page.content()).resolves.toContain('Form title')
    })

    it('should display the form description', async () => {
      // GIVEN
      const { url } = await app.start(description)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.content()).resolves.toContain('Form description')
    })

    it('should display the form inputs', async () => {
      // GIVEN
      const { url } = await app.start(form)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.content()).resolves.toContain('Name')
    })

    it('should display the form submit button', async () => {
      // GIVEN
      const { url } = await app.start(submitLabel)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.content()).resolves.toContain('Save')
    })

    it('should display a success message when the form is submitted', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(successMessage)

      // WHEN
      await page.goto(`${url}/form/user`)
      await page.type('input[name="name"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('Success')

      // THEN
      const html = await page.content()
      expect(html).toContain('Success')
    })

    it('should create a record when the form is submitted', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(successMessage.tables![0])
      const { url } = await app.start(successMessage)

      // WHEN
      await page.goto(`${url}/form/user`)
      await page.type('input[name="name"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('Success')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.name).toBe('John Doe')
    })

    it('should start an automation when the form is submitted', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(withAutomation)

      // WHEN
      await page.goto(`${url}/form/user`)
      await page.type('input[name="name"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('Form submitted successfully!')

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
      expect(histories[0].actions_data).toContain('User created: John Doe')
    })

    it('should not submit the form if the required field is empty', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(required)

      // WHEN
      await page.goto(`${url}/form/user`)
      await page.type('input[name="name"]', '')
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="name"]', (input) => input.checkValidity())

      // THEN
      expect(isValid).toBe(false)
    })

    it('should not submit the form if the required field from a field is empty', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(requiredFromField)

      // WHEN
      await page.goto(`${url}/form/user`)
      await page.type('input[name="name"]', '')
      await page.click('button[type="submit"]')
      await page.waitForTimeout(100)
      const isValid = await page.$eval('input[name="name"]', (input) => input.checkValidity())

      // THEN
      expect(isValid).toBe(false)
    })
  })
})
