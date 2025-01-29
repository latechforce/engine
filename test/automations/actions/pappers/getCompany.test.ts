import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import { pappersCompanySample } from '/infrastructure/integrations/bun/mocks/pappers/PappersIntegration.mock'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Pappers'] }, ({ app, request, integrations }) => {
  beforeEach(async () => {
    await integrations.pappers.addCompany(pappersCompanySample)
  })

  describe('on POST', () => {
    it('should get a company', async () => {
      // GIVEN
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
                siret: '44306184100047',
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/get-company`)

      // THEN
      expect(response.denomination).toBe('GOOGLE FRANCE')
    })
  })
})
