import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithBooleanClass: Config = {
  name: 'App with a run typescript action with boolean class',
  automations: [
    {
      name: 'getIsBoolean',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'is-boolean',
        output: {
          isBoolean: {
            boolean: '{{runJavascriptCode.isBoolean}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function () {
            const isBoolean = Boolean(1)
            return { isBoolean }
          }),
        },
      ],
    },
  ],
}
