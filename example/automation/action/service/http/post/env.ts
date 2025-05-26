import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Make an HTTP POST request with environment variables',
  description: 'Automation with HTTP POST action and environment variables',
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
            'X-Custom-Header': '{{env.TEST_HEADER}}',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
