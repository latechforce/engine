import type { Config } from '/src'

export const configAutomationTriggerIntegrationYoucanbookmeBookingCreated: Config = {
  name: 'App with an automation with a youcanbookme booking created trigger',
  automations: [
    {
      name: 'YouCanBookMeBookingCreated',
      trigger: {
        integration: 'YouCanBookMe',
        event: 'BookingCreated',
        account: 'youcanbookme',
      },
      actions: [],
    },
  ],
}
