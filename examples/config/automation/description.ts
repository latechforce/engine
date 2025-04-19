import type { Config } from '/src'

export const configAutomationDescription: Config = {
  name: 'App with an automation with a description',
  automations: [
    {
      name: 'automation_1',
      description: 'This is a description',
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
