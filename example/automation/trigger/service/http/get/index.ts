import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with an HTTP GET request',
  description: 'Automation with HTTP GET trigger',
  automations: [
    {
      name: 'get',
      trigger: {
        service: 'http',
        event: 'get',
        path: 'get',
      },
      actions: [],
    },
  ],
} satisfies AppSchema
