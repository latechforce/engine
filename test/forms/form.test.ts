import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser }) => {
  describe('on GET', () => {
    it.skip('should display a form', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.1',
        /*forms: [
          {
            name: 'user',
            title: 'Form',
            description: 'Form',
            table: 'users',
            fields: [
              {
                name: 'name',
                label: 'Name',
                required: true,
              },
            ],
          },
        ],*/
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
      const { url } = await app.start(config)

      // WHEN
      await browser.page.goto(`${url}/forms/user`)

      // THEN
      expect(browser.page.title()).resolves.toBe('Form')
    })
  })
})
