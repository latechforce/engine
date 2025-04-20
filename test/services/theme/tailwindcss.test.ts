import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configServiceThemeTailwindcssWithForm } from '/examples/config/service/theme/tailwindcss/withForm'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.page(({ app, browser }) => {
  describe('on open page', () => {
    it('should return link to tailwind.css', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configServiceThemeTailwindcssWithForm)

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      const html = await page.content()
      expect(html).toContain('<link href="/tailwind.css?ts=')
    })

    it('should return the tailwind css content', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configServiceThemeTailwindcssWithForm)

      // WHEN
      const response = await page.goto(`${url}/tailwind.css`)

      // THEN
      const css = await response?.text()
      expect(css).toContain('tailwindcss')
      expect(css).toContain('w-full')
    })

    it('should return link to preline.js', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configServiceThemeTailwindcssWithForm)

      // WHEN
      await page.goto(`${url}/form/user`)

      // THEN
      const html = await page.content()
      expect(html).toContain('<script src="/preline.js?ts=')
    })

    it('should return the preline js content', async () => {
      // GIVEN
      const page = await browser.newPage()
      const { url } = await app.start(configServiceThemeTailwindcssWithForm)

      // WHEN
      const response = await page.goto(`${url}/preline.js`)

      // THEN
      const js = await response?.text()
      expect(js).toContain('preline')
    })
  })
})
