import tester, { it, expect, describe } from 'bun:test'
import { Mock } from '/test/bun'
import { withPort } from '/examples/services/server/with-port'
import { withBaseUrl } from '/examples/services/server/with-base-url'

const mock = new Mock(tester)

mock.app(({ app }) => {
  describe('should start an app', () => {
    it('on a dedicated port', async () => {
      // WHEN
      const startedApp = await app.start(withPort)

      // THEN
      expect(startedApp.url).toBe('http://localhost:6543')
    })

    it('on a base url', async () => {
      // WHEN
      const startedApp = await app.start(withBaseUrl)

      // THEN
      expect(startedApp.url).toBe('http://custom-url.com')
    })
  })
})
