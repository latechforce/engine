import tester, { it, expect, describe } from 'bun:test'
import { Mock } from '/test/bun'
import { port } from '../../examples/config/service/server/port'
import { baseUrl } from '../../examples/config/service/server/baseUrl'

const mock = new Mock(tester)

mock.app(({ app }) => {
  describe('should start an app', () => {
    it('on a dedicated port', async () => {
      // WHEN
      const startedApp = await app.start(port)

      // THEN
      expect(startedApp.url).toBe('http://localhost:6543')
    })

    it('on a base url', async () => {
      // WHEN
      const startedApp = await app.start(baseUrl)

      // THEN
      expect(startedApp.url).toBe('http://custom-url.com')
    })
  })
})
