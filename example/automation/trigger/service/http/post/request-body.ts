import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with an HTTP POST request with request body',
  description: 'Automation with HTTP POST trigger and request body',
  automations: [
    {
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'post',
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
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          body: {
            message: 'Hello, {{trigger.body.name}}!',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
