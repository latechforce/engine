import type { AppSchema } from '@/types'

export default {
  name: 'HTTP GET trigger',
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
