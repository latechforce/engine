import type { Config } from '/src'

export const configAutomationTriggerServiceHttpApiCalledAuth: Config = {
  name: 'App with an automation with a http api called trigger with auth',
  automations: [
    {
      name: 'ApiCalled',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: '/run',
        auth: 'ApiKey',
      },
      actions: [],
    },
  ],
  services: {
    server: {
      apiKeys: ['test-key'],
    },
  },
}
