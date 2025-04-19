import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithTextDecoderClass: Config = {
  name: 'App with a run typescript action with TextDecoder class',
  automations: [
    {
      name: 'getTextDecoder',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-text-decoder',
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
            const decoder = new TextDecoder()
            return { exist: !!decoder }
          }),
        },
      ],
    },
  ],
}
