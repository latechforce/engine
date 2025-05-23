import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Make an HTTP GET request with headers',
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
