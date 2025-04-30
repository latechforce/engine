import type { Config } from '/src'

export const configAutomationTriggerIntegrationZoomWebinarParticipantJoined: Config = {
  name: 'App with an automation with a zoom webinar participant joined trigger',
  automations: [
    {
      name: 'WebinarParticipantJoinedTrigger',
      trigger: {
        integration: 'Zoom',
        event: 'WebinarParticipantJoinedTrigger',
        account: 'zoom',
      },
      actions: [],
    },
  ],
}
