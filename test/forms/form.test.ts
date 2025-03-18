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
          name: 'user',
          path: 'user',
          title: 'Form title',
          description: 'Form description',
          table: 'users',
          inputs: [
            {
              field: 'name',
              label: 'Name',
              required: true,
            },
          ],
          submitLabel: 'Save',
          successMessage: 'Success',
        },
      ],
      tables: [
        {
          name: 'users',
          fields: [
            {
              name: 'name',
              type: 'SingleLineText',
            },
          ],
        },
      ],
    }

    it('should display the form title', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const { page } = browser

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.title()).resolves.toBe('Form title')
      expect(page.content()).resolves.toContain('Form title')
    })

    it('should display the form description', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const { page } = browser

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.content()).resolves.toContain('Form description')
    })

    it('should display the form inputs', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const { page } = browser

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.content()).resolves.toContain('Name')
    })

    it('should display the form submit button', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const { page } = browser

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.content()).resolves.toContain('Save')
    })

    it('should create a record when the form is submitted', async () => {
      // GIVEN
      const { page } = browser
      const table = drivers.database.table(config.tables![0])
      const { url } = await app.start(config)

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

    it('should display a success message when the form is submitted', async () => {
      // GIVEN
      const { page } = browser
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/user`)

      await page.type('input[name="name"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('Success')

      // THEN
      const html = await page.content()
      expect(html).toContain('Success')
    })
  })
})
