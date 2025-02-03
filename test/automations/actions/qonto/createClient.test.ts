import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Qonto'] }, ({ app, request }) => {
  describe('on POST', () => {
    it('should create a client', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'createClient',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-client',
              output: {
                id: '{{createClient.id}}',
              },
            },
            actions: [
              {
                name: 'createClient',
                integration: 'Qonto',
                action: 'CreateClient',
                client: {
                  name: 'John Doe',
                  type: 'company',
                  email: 'test@test.com',
                  vat_number: 'FR12345678901',
                  currency: 'EUR',
                  locale: 'FR',
                  address: '1 rue de Paris',
                  city: 'Paris',
                  zip_code: '75001',
                  country_code: 'FR',
                },
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-client`)

      // THEN
      expect(response.id).toBeDefined()
    })
  })
})
