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
        postHttp: {
          path: 'response',
        },
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          responseHttp: {
            body: {
              message: 'Hello, world!',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
