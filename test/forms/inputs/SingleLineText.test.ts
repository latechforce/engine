import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser, drivers }) => {
  describe('open page', () => {
    const config: Config = {
      name: 'App',
      version: '1.0.1',
      forms: [
        {
          name: 'user',
          path: 'user',
          table: 'users',
          inputs: [
            {
              field: 'name',
              label: 'Name',
              required: true,
            },
          ],
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

    it('should display the text input', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const { page } = browser

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      expect(page.content()).resolves.toContain('Name')
    })

    it('should create a record when the text input', async () => {
      // GIVEN
      const { page } = browser
      const table = drivers.database.table(config.tables![0])
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/user`)

      await page.type('input[name="name"]', 'John Doe')
      await page.click('button[type="submit"]')
      await page.waitForText('submitted')

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(1)
      expect(records[0].fields.name).toBe('John Doe')
    })
  })
})
