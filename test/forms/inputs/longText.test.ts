import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configFormInputLongText } from '/examples/config/form/input/longText'
import { configFormInputLongTextRequired } from '/examples/config/form/input/longText/required'
import { configFormInputLongTextMinLength } from '/examples/config/form/input/longText/minLength'
import { configFormInputLongTextMaxLength } from '/examples/config/form/input/longText/maxLength'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    it('should display the textarea', async () => {
      // GIVEN
      const { url } = await app.start(configFormInputLongText)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Long Text')
    })

    it('should create a record with a textarea', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(configFormInputLongText.tables![0])
      const { url } = await app.start(configFormInputLongText)
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
      const { url } = await app.start(configFormInputLongTextRequired)
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
      const { url } = await app.start(configFormInputLongTextMinLength)
      const page = await browser.newPage()
      const longText = 'sho'

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
      const { url } = await app.start(configFormInputLongTextMaxLength)
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(configFormInputLongTextMaxLength.tables![0])
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
