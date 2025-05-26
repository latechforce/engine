import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Make an HTTP GET request',
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
