import type { Config } from '/src'

export const configAutomationTriggerIntegrationJotformFormWebhookReceived: Config = {
  name: 'App with an automation with a jotform form webhook received trigger',
  integrations: {
    jotform: [
      {
        account: 'jotform_account',
        apiKey: '{{ env.TEST_JOTFORM_API_KEY }}',
        baseUrl: '{{ env.TEST_JOTFORM_BASE_URL }}',
      },
    ],
  },
  automations: [
    {
      name: 'FormWebhookReceived',
      trigger: {
        integration: 'Jotform',
        event: 'FormWebhookReceived',
        account: 'jotform_account',
        formId: '{{ env.TEST_JOTFORM_FORM_ID }}',
      },
      actions: [],
    },
  ],
  services: {
    server: {
      port: 3000,
    },
  },
}
