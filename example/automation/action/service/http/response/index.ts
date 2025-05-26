import type { AppSchema } from '@/types'

export default {
  name: 'Respond to an HTTP request',
  description: 'Automation with HTTP response action',
  automations: [
    {
      name: 'response',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'response',
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
        },
      ],
    },
  ],
} satisfies AppSchema
