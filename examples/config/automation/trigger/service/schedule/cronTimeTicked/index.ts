import type { Config } from '/src'

export const configAutomationTriggerServiceScheduleCronTimeTicked: Config = {
  name: 'App with an automation with a cron time ticked trigger',
  automations: [
    {
      name: 'CronTimeTicked',
      trigger: {
        service: 'Schedule',
        event: 'CronTimeTicked',
        cronTime: '*/2 * * * * *',
      },
      actions: [],
    },
  ],
}
