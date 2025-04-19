import type { Config } from '/src'

export const configAutomationWithErrorActions: Config = {
  name: 'App with an automation with error actions',
  automations: [
    {
      name: 'automation_with_error_actions',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: '/run',
      },
      actions: [
        {
          name: 'firstCodeAction',
          service: 'Code',
          action: 'RunJavascript',
          code: String(function () {
            throw new Error('firstCodeAction')
          }),
        },
        {
          name: 'secondCodeAction',
          service: 'Code',
          action: 'RunJavascript',
          code: String(function () {
            throw new Error('secondCodeAction')
          }),
        },
      ],
    },
  ],
}
