import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with an HTTP POST request and respond immediately',
  description: 'Automation with HTTP POST trigger and respond immediately',
  automations: [
    {
      id: 1,
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'post',
          respondImmediately: true,
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
