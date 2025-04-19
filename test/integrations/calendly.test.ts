import tester, { it, expect, describe } from 'bun:test'
import { Mock } from '/test/bun'
import { configIntegrationCalendly } from '/examples/config/integration/calendly'

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
