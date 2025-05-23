import type { AppSchema } from '@/types'

export default {
  name: 'Calendly invite created',
  description: 'Automation with Calendly invite created trigger',
  automations: [
    {
      name: 'calendly',
      trigger: {
        service: 'calendly',
        event: 'invite-created',
        path: '/calendly-invite-created',
      },
      actions: [],
    },
  ],
} satisfies AppSchema
