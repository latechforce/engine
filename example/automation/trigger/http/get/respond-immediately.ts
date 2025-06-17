import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with an HTTP GET request and respond immediately',
  description: 'Automation with HTTP GET trigger and respond immediately',
  automations: [
    {
      id: 1,
      name: 'get',
      trigger: {
        service: 'http',
        event: 'get',
        getHttp: {
          path: 'get',
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
