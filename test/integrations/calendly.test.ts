import tester, { it, expect, describe } from 'bun:test'
import { Mock } from '/test/bun'
import { configIntegrationCalendly } from '/examples/config/integration/calendly'
import { configIntegrationCalendlyWithPort } from '/examples/config/integration/calendly/withPortAndLogs'

const mock = new Mock(tester, { integrations: ['Calendly'] })

mock.request(({ app, request }) => {
  describe('should connect to calendly', () => {
    it('with a valid access token', async () => {
      // GIVEN
      const { url } = await app.start(configIntegrationCalendly)

      // WHEN
      const response = await request.post(`${url}/api/integration/calendly/test-connection`, {
        account: 'calendly',
      })

      // THEN
      expect(response.error).toBeUndefined()
      expect(response.success).toBe(true)
    })
  })
})

const mockOAuth = new Mock(tester, { unmocked: true, drivers: [] })

mockOAuth.page(({ app, browser }) => {
  describe('should connect to calendly', () => {
    it.skip('with a OAuth connection', async () => {
      // GIVEN
      const { url } = await app.start(configIntegrationCalendlyWithPort)
      const page = await browser.newPage({ headless: false })

      // WHEN
      await page.goto(`${url}/admin/integrations`)
      await page.click('button#hs-dropdown-custom-icon-trigger')
      await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'))
        const target = links.find((link) => link.textContent?.trim() === 'Connect account')
        if (target) target.click()
      })

      await page.waitForUrl(`https://calendly.com/app/login`)

      // THEN
      expect(page.title()).resolves.toBe('Integrations | Admin')
      expect(page.content()).resolves.toContain('Calendly')
      expect(page.content()).resolves.toContain('Connect')
    })
  })
})
