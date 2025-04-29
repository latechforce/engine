import type { Config } from '/src'

export const configAutomationTriggerIntegrationJotformFormWebhookReceived: Config = {
  name: 'App with an automation with a jotform form webhook received trigger',
  automations: [
    {
      name: 'FormWebhookReceived',
      trigger: {
        integration: 'Jotform',
        event: 'FormWebhookReceived',
        account: 'jotform',
        formId: '{{ env.TEST_JOTFORM_FORM_ID }}',
      },
      actions: [],
    },
  ],
}
