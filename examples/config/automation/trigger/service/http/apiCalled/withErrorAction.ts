import type { Config } from '/src'

export const configAutomationTriggerServiceHttpApiCalledWithErrorAction: Config = {
  name: 'App with an automation with a http api called trigger with an error action',
  automations: [
    {
      name: 'ApiCalledWithError',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run',
      },
      actions: [
        {
          name: 'throwError',
          service: 'Code',
          action: 'RunJavascript',
          code: String(function () {
            throw new Error('Test error')
          }),
        },
      ],
    },
  ],
}
