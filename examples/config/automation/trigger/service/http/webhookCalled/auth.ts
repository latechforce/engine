import type { Config } from '/src'

export const configAutomationTriggerServiceHttpWebhookCalledAuth: Config = {
  name: 'App with an automation with a http webhook called trigger with auth',
  automations: [
    {
      name: 'WebhookCalledWithApiKeyAuth',
      trigger: {
        service: 'Http',
        event: 'WebhookCalled',
        path: 'run',
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
