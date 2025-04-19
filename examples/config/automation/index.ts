import type { Config } from '/src'

export const configAutomation: Config = {
  name: 'App with an automation',
  automations: [
    {
      name: 'automation_1',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: '/run',
      },
      actions: [
        {
          name: 'action_1',
          service: 'Code',
          action: 'RunJavascript',
          code: String(function () {
            console.log('Hello, world!')
          }),
        },
      ],
    },
  ],
}
