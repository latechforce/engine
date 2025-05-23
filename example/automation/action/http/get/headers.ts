import type { AppSchema } from '@/types'

export default {
  name: 'HTTP GET action with headers',
  description: 'Automation with HTTP GET action and headers',
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
          headers: {
            'X-Custom-Header': 'test',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
