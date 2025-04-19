import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithArrayClass: Config = {
  name: 'App with a run typescript action with array class',
  automations: [
    {
      name: 'getIsArray',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'is-array',
        output: {
          isArray: {
            boolean: '{{runJavascriptCode.isArray}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function () {
            const isArray = Array.isArray([1, 2, 3])
            return { isArray }
          }),
        },
      ],
    },
  ],
}
