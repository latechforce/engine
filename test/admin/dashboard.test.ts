import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { config } from '/examples/config'

const mock = new Mock(Tester)

mock.page(({ app, browser }) => {
  describe('open page', () => {
    it('should display the admin dashboard', async () => {
      // GIVEN
      const { url } = await app.start(config)
      const page = await browser.newPage()

      // WHEN
      await page.goto(`${url}/admin`)

      // THEN
      expect(page.title()).resolves.toBe('Dashboard | Admin')
      expect(page.content()).resolves.toContain('Admin')
      expect(page.content()).resolves.toContain('Dashboard')
      expect(page.content()).resolves.toContain('Forms')
      expect(page.content()).resolves.toContain('Automations')
      expect(page.content()).resolves.toContain('Tables')
      expect(page.content()).resolves.toContain('Integrations')
    })
  })

  it('should redirect to /admin/forms', async () => {
    // GIVEN
    const { url } = await app.start(config)
    const page = await browser.newPage()

    // WHEN
    await page.goto(`${url}/admin`)
    await page.click('a[href="/admin/forms"]')
    await page.waitForUrl(`${url}/admin/forms`)

    // THEN
    expect(page.url()).toBe(`${url}/admin/forms`)
  })
})
