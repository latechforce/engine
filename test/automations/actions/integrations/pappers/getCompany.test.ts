import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { pappersCompanySample } from '/infrastructure/integrations/bun/mocks/pappers/PappersTestSamples'

const mock = new Mock(Tester, { integrations: ['Pappers'] })

mock.request(({ app, request, integrations }) => {
  const config: Config = {
    name: 'App',
    version: '1.0.0',
    engine: '1.0.0',
    automations: [
      {
        name: 'getCompany',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'get-company',
          output: {
            denomination: '{{getCompany.denomination}}',
          },
        },
        actions: [
          {
            name: 'getCompany',
            integration: 'Pappers',
            action: 'GetCompany',
            account: 'pappers',
            siret: '44306184100047',
          },
        ],
      },
    ],
  }

  beforeEach(async () => {
    await integrations.pappers.addCompany(pappersCompanySample)
  })

  describe('on start', () => {
    it('should return a config error if the configuration is not valid', async () => {
      // GIVEN
      const extendConfig: Config = {
        ...config,
        integrations: {
          pappers: [
            {
              name: 'pappers',
              baseUrl: './tmp/new-api-key',
              apiKey: 'new-api-key',
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

  describe('on POST', () => {
    it('should get a company', async () => {
      // GIVEN
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-company`)

      // THEN
      expect(response.denomination).toBe('GOOGLE FRANCE')
    })
  })
})
