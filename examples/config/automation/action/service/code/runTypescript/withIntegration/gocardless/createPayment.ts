import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import { goCardlessCreatePaymentSample } from '/infrastructure/integrations/bun/mocks/gocardless/GoCardlessTestSamples'

export const configAutomationActionServiceCodeRunTypescriptWithGoCardlessCreatePaymentIntegration: Config =
  {
    name: 'App with a run typescript action with a GoCardless integration with create payment method',
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
