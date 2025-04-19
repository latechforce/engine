import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { config } from '/examples/config'

const mock = new Mock(Tester)

mock.page(({ app, browser }) => {
  describe('open page', () => {
    it('should display the admin tables', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/admin/tables`)

      // THEN
      expect(page.title()).resolves.toBe('Tables | Admin')
      expect(page.content()).resolves.toContain('Admin')
      expect(page.content()).resolves.toContain('Dashboard')
      expect(page.content()).resolves.toContain('Forms')
      expect(page.content()).resolves.toContain('Automations')
      expect(page.content()).resolves.toContain('Tables')
      expect(page.content()).resolves.toContain('Integrations')
    })
  })
})
