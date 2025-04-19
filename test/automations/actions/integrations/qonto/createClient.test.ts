import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { configAutomationActionIntegrationQontoCreateClient } from '/examples/config/automation/action/integration/qonto/createClient'

new Mock(Tester).app(({ app }) => {
  describe('on start', () => {
    it('should return a config error if the configuration is not valid', async () => {
      // GIVEN
      const extendConfig: Config = {
        ...configAutomationActionIntegrationQontoCreateClient,
        integrations: {
          qonto: [
            {
              account: 'qonto',
              baseUrl: ':memory:',
              organisationSlug: 'new-organization-slug',
              secretKey: 'invalid-secret-key',
            },
          ],
        },
      }

      // WHEN
      const call = async () => app.start(extendConfig)

      // THEN
      expect(call()).rejects.toThrow('Test connection failed')
    })
  })
})

new Mock(Tester, { integrations: ['Qonto'] }).request(({ app, request }) => {
  describe('on POST', () => {
    it('should create a client', async () => {
      const { url } = await app.start(configAutomationActionIntegrationQontoCreateClient)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-client`)

      // THEN
      expect(response.id).toBeDefined()
    })
  })
})
