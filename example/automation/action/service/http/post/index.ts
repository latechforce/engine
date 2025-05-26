import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Make an HTTP POST request',
  description: 'Automation with HTTP POST action and body',
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
        },
      ],
    },
  ],
} satisfies AppSchema
