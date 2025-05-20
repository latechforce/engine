import type { AppSchema } from '@/types'

export const requestBodyPostHttpTrigger: AppSchema = {
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
}
