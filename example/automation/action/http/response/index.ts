import type { AppSchema } from '@/types'

export default {
  name: 'HTTP response action',
  description: 'Automation with http response action',
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
