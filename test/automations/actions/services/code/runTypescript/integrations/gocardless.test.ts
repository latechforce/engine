import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { goCardlessCreatePaymentSample } from '/infrastructure/integrations/bun/mocks/gocardless/GoCardlessTestSamples'

const mock = new Mock(Tester, { integrations: ['GoCardless'] })

mock.request(({ app, request, integrations }) => {
  describe('on POST', () => {
    it('should run a Typescript code with GoCardless create payment', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',

        automations: [
          {
            name: 'createPayment',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-payment',
              output: {
                payment: {
                  json: '{{runJavascriptCode.payment}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  createPayment: {
                    json: JSON.stringify(goCardlessCreatePaymentSample),
                  },
                },
                code: String(async function (
                  context: CodeRunnerContext<{
                    createPayment: typeof goCardlessCreatePaymentSample
                  }>
                ) {
                  const { gocardless } = context.integrations
                  const { createPayment } = context.inputData
                  const payment = await gocardless.createPayment('gocardless', createPayment)
                  return { payment }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-payment`)

      // THEN
      expect(response.payment.id).toBeDefined()
    })

    it('should run a Typescript code with GoCardless list payments', async () => {
      // GIVEN
      const payment = await integrations.gocardless.createPayment(goCardlessCreatePaymentSample)
      const config: Config = {
        name: 'App',

        automations: [
          {
            name: 'listPayments',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'list-payments',
              output: {
                payments: { json: '{{runTypescriptCode.payments}}' },
                meta: { json: '{{runTypescriptCode.meta}}' },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runTypescriptCode',
                code: String(async function (context: CodeRunnerContext<{}>) {
                  const { gocardless } = context.integrations

                  const result = await gocardless.listPayments('gocardless', {
                    limit: 10,
                    status: 'pending_submission',
                  })
                  return result
                }),
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
      expect(response.payments[0].id).toBe(payment.data?.id)
    })
  })
})
