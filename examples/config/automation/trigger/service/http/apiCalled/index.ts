import type { Config } from '/src'

export const configAutomationTriggerServiceHttpApiCalled: Config = {
  name: 'App with an automation with a http api called trigger',
  automations: [
    {
      name: 'ApiCalled',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: '/run',
      },
      actions: [],
    },
  ],
}
