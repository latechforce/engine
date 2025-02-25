import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['GoCardless'] }, ({ app, request }) => {
  describe('on POST', () => {
    it('should create a payment', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'createPayment',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-payment',
              output: {
                id: '{{createPayment.id}}',
              },
            },
            actions: [
              {
                name: 'createPayment',
                integration: 'GoCardless',
                action: 'CreatePayment',
                payment: {
                  amount: 1000,
                  currency: 'EUR',
                  description: 'Test payment',
                  mandate: 'MD123',
                  charge_date: '2025-01-01',
                  retry_if_possible: true,
                },
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-payment`)

      // THEN
      expect(response.id).toBeDefined()
    })
  })
})
