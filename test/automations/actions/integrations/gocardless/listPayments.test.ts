import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { integrations: ['GoCardless'] })

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should list payments', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        engine: '1.0.0',
        automations: [
          {
            name: 'listPayments',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'list-payments',
              output: {
                payments: { json: '{{listPayments.payments}}' },
                meta: { json: '{{listPayments.meta}}' },
              },
            },
            actions: [
              {
                name: 'listPayments',
                integration: 'GoCardless',
                action: 'ListPayments',
                account: 'gocardless',
                params: {
                  limit: 10,
                  status: 'pending_submission',
                },
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/list-payments`)

      // THEN
      expect(response.payments).toBeDefined()
      expect(Array.isArray(response.payments)).toBe(true)
      expect(response.meta.limit).toBe(10)
    })
  })
})
