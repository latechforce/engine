import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with a cron time',
  description: 'Automation with cron time trigger',
  automations: [
    {
      id: 1,
      name: 'cron-time',
      trigger: {
        service: 'schedule',
        event: 'cron-time',
        params: {
          expression: '*/2 * * * * *',
          timeZone: 'Europe/Paris',
        },
      },
      actions: [],
    },
  ],
} satisfies AppSchema
