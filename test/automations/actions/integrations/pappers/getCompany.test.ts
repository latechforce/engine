import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { pappersCompanySample } from '/infrastructure/integrations/bun/mocks/pappers/PappersTestSamples'

const config: Config = {
  name: 'App',
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

new Mock(Tester).app(({ app }) => {
  describe('on start', () => {
    it('should return a config error if the configuration is not valid', async () => {
      // GIVEN
      const extendConfig: Config = {
        ...config,
        integrations: {
          pappers: [
            {
              account: 'pappers',
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
})

new Mock(Tester, { integrations: ['Pappers'] }).request(({ app, request, integrations }) => {
  beforeEach(async () => {
    await integrations.pappers.addCompany(pappersCompanySample)
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
