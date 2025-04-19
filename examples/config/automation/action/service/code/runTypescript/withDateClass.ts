import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDateClass: Config = {
  name: 'App with a run typescript action with date class',
  automations: [
    {
      name: 'getTimestamp',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-timestamp',
        output: {
          timestamp: {
            number: '{{runJavascriptCode.timestamp}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function () {
            const timestamp = Date.now()
            return { timestamp }
          }),
        },
      ],
    },
  ],
}
