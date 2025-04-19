import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithQontoCreateClientIntegration: Config =
  {
    name: 'App with a run typescript action with a Qonto integration with create client method',
    automations: [
      {
        name: 'createClient',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'create-client',
          input: {
            type: 'object',
            properties: {
              createClient: { type: 'string' },
            },
          },
          output: {
            client: {
              json: '{{runJavascriptCode.client}}',
            },
          },
        },
        actions: [
          {
            service: 'Code',
            action: 'RunTypescript',
            name: 'runJavascriptCode',
            input: {
              createClient: '{{trigger.body.createClient}}',
            },
            code: String(async function (context: CodeRunnerContext<{ createClient: string }>) {
              const { qonto } = context.integrations
              const { createClient } = context.inputData
              const client = await qonto.createClient('qonto', JSON.parse(createClient))
              return { client }
            }),
          },
        ],
      },
    ],
  }
