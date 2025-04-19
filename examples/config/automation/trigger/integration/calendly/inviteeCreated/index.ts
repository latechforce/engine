import type { Config } from '/src'

export const configAutomationTriggerIntegrationCalendlyInviteeCreated: Config = {
  name: 'App with an automation with a calendly invitee created trigger',
  automations: [
    {
      name: 'CalendlyInviteeCreated',
      trigger: {
        integration: 'Calendly',
        event: 'InviteeCreated',
        account: 'calendly',
      },
      actions: [],
    },
  ],
}
