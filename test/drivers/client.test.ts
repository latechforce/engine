import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser }) => {
  const config: Config = {
    name: 'App',
    version: '1.0.0',
    forms: [
      {
        name: 'Form',
        path: 'user',
        table: 'users',
        inputs: [],
      },
    ],
    tables: [
      {
        name: 'users',
        fields: [],
      },
    ],
  }

  describe('on open page', () => {
    it('should return link to script.js', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(config)

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      const html = await page.content()
      expect(html).toContain('<script src="/script.js">')
    })

    it('should return the htmx js content', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(config)

      // WHEN
      const response = await page.goto(`${url}/script.js`)

      // THEN
      const js = await response?.text()
      expect(js).toContain('htmx')
    })
  })
})
