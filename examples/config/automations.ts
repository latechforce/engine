import type { Config } from '/src'

export const configAutomations: Config = {
  name: 'App with automations',
  automations: [
    {
      name: 'automation_1',
      trigger: {
        service: 'Schedule',
        event: 'CronTimeTicked',
        cronTime: '0 0 * * *',
      },
      actions: [
        {
          name: 'action_1',
          service: 'Code',
          action: 'RunJavascript',
          code: 'async function() { console.log("Hello, world!") }',
        },
      ],
    },
    {
      name: 'automation_2',
      trigger: {
        service: 'Http',
        event: 'WebhookCalled',
        path: '/webhook_1',
      },
      actions: [
        {
          name: 'action_1',
          service: 'Code',
          action: 'RunJavascript',
          code: 'async function() { console.log("Hello, world!") }',
        },
      ],
    },
  ],
}
