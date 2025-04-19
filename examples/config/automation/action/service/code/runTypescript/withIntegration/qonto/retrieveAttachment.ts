import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithQontoRetrieveAttachmentIntegration: Config =
  {
    name: 'App with a run typescript action with a Qonto integration with retrieve attachment method',
    automations: [
      {
        name: 'retrieveAttachment',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'retrieve-attachment',
          input: {
            type: 'object',
            properties: {
              attachmentId: { type: 'string' },
            },
          },
          output: {
            attachment: {
              json: '{{runJavascriptCode.attachment}}',
            },
          },
        },
        actions: [
          {
            service: 'Code',
            action: 'RunTypescript',
            name: 'runJavascriptCode',
            input: {
              attachmentId: '{{trigger.body.attachmentId}}',
            },
            code: String(async function (context: CodeRunnerContext<{ attachmentId: string }>) {
              const { qonto } = context.integrations
              const { attachmentId } = context.inputData
              const attachment = await qonto.retrieveAttachment('qonto', attachmentId)
              return { attachment }
            }),
          },
        ],
      },
    ],
  }
