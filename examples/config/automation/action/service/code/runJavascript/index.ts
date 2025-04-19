import type { Config } from '/src'

export const configAutomationActionServiceCodeRunJavascript: Config = {
  name: 'App',
  automations: [
    {
      name: 'runJavascript',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run-javascript',
        output: {
          message: '{{runJavascriptCode.message}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunJavascript',
          name: 'runJavascriptCode',
          code: String(async function () {
            return { message: 'Hello, world!' }
          }),
        },
      ],
    },
  ],
}
