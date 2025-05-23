import type { AppSchema } from '@/types'

export default {
  name: 'HTTP GET action',
  description: 'Automation with HTTP GET action',
  automations: [
    {
      name: 'get',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'get',
      },
      actions: [
        {
          name: 'request',
          service: 'http',
          action: 'get',
          url: 'https://httpbin.org/get',
        },
      ],
    },
  ],
} satisfies AppSchema
