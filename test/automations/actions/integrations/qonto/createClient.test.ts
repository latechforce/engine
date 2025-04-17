import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { integrations: ['Qonto'] })

mock.request(({ app, request }) => {
  const config: Config = {
    name: 'App',

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
            account: 'qonto',
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

  describe('on start', () => {
    it('should return a config error if the configuration is not valid', async () => {
      // GIVEN
      const extendConfig: Config = {
        ...config,
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

  describe('on POST', () => {
    it('should create a client', async () => {
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-client`)

      // THEN
      expect(response.id).toBeDefined()
    })
  })
})
