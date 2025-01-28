import Tester, { expect, describe, it } from 'bun:test'
import { IntegrationTest, type Config } from '../../../../src/infrastructure/test/integration'

new IntegrationTest(Tester).with({ integrations: ['Pappers'] }, ({ app, request }) => {
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
