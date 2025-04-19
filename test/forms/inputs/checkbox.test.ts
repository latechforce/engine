import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configFormInputCheckbox } from '/examples/config/form/input/checkbox'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    it('should display the checkbox input', async () => {
      // GIVEN
      const { url } = await app.start(configFormInputCheckbox)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/form/path`)

      // THEN
      expect(page.content()).resolves.toContain('Checkbox')
    })

    it('should create a record with a checkbox input', async () => {
      // GIVEN
      const page = await browser.newPage()
      const table = drivers.database.tableFromSchema(configFormInputCheckbox.tables![0])
      const { url } = await app.start(configFormInputCheckbox)

      // WHEN
      await page.goto(`${url}/form/path`)
      await page.click('input[name="checkbox"]')
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.checkbox).toBe(true)
    })
  })
})
