import tester, { it, expect, describe } from 'bun:test'
import { Mock } from '/test/bun'
import { configServiceServerPort } from '/examples/config/service/server/port'
import { configServiceServerBaseUrl } from '/examples/config/service/server/baseUrl'

const mock = new Mock(tester)

mock.app(({ app }) => {
  describe('should start an app', () => {
    it('on a dedicated port', async () => {
      // WHEN
      const startedApp = await app.start(configServiceServerPort)

      // THEN
      expect(startedApp.url).toBe('http://localhost:6543')
    })

    it('on a base url', async () => {
      // WHEN
      const startedApp = await app.start(configServiceServerBaseUrl)

      // THEN
      expect(startedApp.url).toBe('http://custom-url.com')
    })
  })
})
