import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configServiceClient } from '/examples/config/service/client'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser }) => {
  describe('on open page', () => {
    it('should return link to script.js', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configServiceClient)

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      const html = await page.content()
      expect(html).toContain('<script src="/script.js?ts=')
    })

    it('should return the htmx js content', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configServiceClient)

      // WHEN
      const response = await page.goto(`${url}/script.js`)

      // THEN
      const js = await response?.text()
      expect(js).toContain('htmx')
    })
  })
})
