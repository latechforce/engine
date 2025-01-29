import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getAutomationConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({}, ({ app, request }) => {
  describe('on POST', () => {
    it('should run an automation', async () => {
      // GIVEN
      const config = getAutomationConfig('WebhookCalled')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.success).toBeTruthy()
    })
  })
})
