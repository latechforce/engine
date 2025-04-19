import type { Config } from '/src'

export const configAutomationTriggerServiceHttpApiCalledOutput: Config = {
  name: 'App with an automation with a http api called trigger with output',
  automations: [
    {
      name: 'ApiCalled',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: '/run',
        output: {
          value: 'hello',
        },
      },
      actions: [],
    },
  ],
}
