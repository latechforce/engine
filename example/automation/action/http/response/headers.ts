import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Respond to an HTTP request with a static body',
  description: 'Automation with HTTP response action and static body',
  automations: [
    {
      id: 1,
      name: 'response',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'response',
        },
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          params: {
            headers: {
              'Content-Type': 'text/plain',
            },
            body: 'Hello, world!',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
