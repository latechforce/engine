import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { goCardlessCreatePaymentSample } from '/infrastructure/integrations/bun/mocks/gocardless/GoCardlessTestSamples'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['GoCardless'] }, ({ app, request }) => {
  describe('on POST', () => {
    it('should run a Typescript code with GoCardless create payment', async () => {
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
                  const payment = await gocardless.createPayment(createPayment)
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
  })
})
