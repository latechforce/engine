import type { Config } from '/src'

export const configAutomationTriggerServiceHttpWebhookCalled: Config = {
  name: 'App with an automation with a http webhook called trigger',
  automations: [
    {
      name: 'WebhookCalled',
      trigger: {
        service: 'Http',
        event: 'WebhookCalled',
        path: '/run',
      },
      actions: [],
    },
  ],
}
