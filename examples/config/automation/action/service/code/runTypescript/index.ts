import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescript: Config = {
  name: 'App with a run typescript action',
  automations: [
    {
      name: 'run-typescript',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run-typescript',
        output: {
          message: '{{runTypescriptCode.message}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runTypescriptCode',
          code: String(async function () {
            return { message: 'Hello, world!' }
          }),
        },
      ],
    },
  ],
}
