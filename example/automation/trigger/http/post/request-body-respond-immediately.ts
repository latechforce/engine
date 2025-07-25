import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with an HTTP POST request with request body and respond immediately',
  description: 'Automation with HTTP POST trigger and request body and respond immediately',
  automations: [
    {
      id: 1,
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'post',
          respondImmediately: true,
          requestBody: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            required: ['name'],
          },
        },
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          params: {
            body: {
              message: 'Hello, {{trigger.body.name}}!',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
