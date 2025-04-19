import type { Config } from '/src'

export const configAutomationActionIntegrationQontoRetrieveAttachment: Config = {
  name: 'App with Qonto integration with RetrieveAttachment action',
  automations: [
    {
      name: 'retrieveAttachment',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'retrieve-attachment',
        output: {
          attachment: {
            json: '{{retrieveAttachment}}',
          },
        },
      },
      actions: [
        {
          name: 'retrieveAttachment',
          integration: 'Qonto',
          action: 'RetrieveAttachment',
          account: 'qonto',
          attachmentId: '{{trigger.body.attachmentId}}',
        },
      ],
    },
  ],
}
