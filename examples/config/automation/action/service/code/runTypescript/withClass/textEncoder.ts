import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithTextEncoderClass: Config = {
  name: 'App with a run typescript action with TextEncoder class',
  automations: [
    {
      name: 'getTextEncoder',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-text-encoder',
        output: {
          exist: '{{runJavascriptCode.exist}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function () {
            const encoder = new TextEncoder()
            return { exist: !!encoder }
          }),
        },
      ],
    },
  ],
}
