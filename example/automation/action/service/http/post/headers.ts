import type { AppSchema } from '@/types'

export default {
  name: 'HTTP POST action with headers',
  description: 'Automation with HTTP POST action and headers',
  automations: [
    {
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'post',
      },
      actions: [
        {
          name: 'request',
          service: 'http',
          action: 'post',
          url: 'https://httpbin.org/post',
          headers: {
            'X-Custom-Header': 'test',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
