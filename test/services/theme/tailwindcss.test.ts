import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { tailwindcss } from '/examples/config/service/theme/tailwindcss'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser }) => {
  describe('on open page', () => {
    it('should return link to style.css', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(tailwindcss)

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      const html = await page.content()
      expect(html).toContain('<link href="/style.css?ts=')
    })

    it('should return the tailwind css content', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(tailwindcss)

      // WHEN
      const response = await page.goto(`${url}/style.css`)

      // THEN
      const css = await response?.text()
      expect(css).toContain('tailwindcss')
      expect(css).toContain('w-full')
    })

    it('should return link to style.js', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(tailwindcss)

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      const html = await page.content()
      expect(html).toContain('<script src="/style.js?ts=')
    })

    it('should return the preline js content', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(tailwindcss)

      // WHEN
      const response = await page.goto(`${url}/style.js`)

      // THEN
      const js = await response?.text()
      expect(js).toContain('preline')
    })
  })
})
