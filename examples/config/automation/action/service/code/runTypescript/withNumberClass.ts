import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithNumberClass: Config = {
  name: 'App with a run typescript action with number class',
  automations: [
    {
      name: 'getIsNumber',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'is-number',
        output: {
          isNumber: {
            boolean: '{{runJavascriptCode.isNumber}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function () {
            const isNumber = Number('1') == 1
            return { isNumber }
          }),
        },
      ],
    },
  ],
}
