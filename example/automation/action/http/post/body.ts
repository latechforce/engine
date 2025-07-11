import type { AppSchema } from '@/types'

export const inGuides = false

export const env = {
  API_PORT: 6000,
}

export default {
  name: 'Make an HTTP POST request with body',
  description: 'Automation with HTTP POST action and body',
  automations: [
    {
      id: 1,
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'post',
        },
      },
      actions: [
        {
          name: 'request',
          service: 'http',
          action: 'post',
          params: {
            url: 'http://localhost:{{env "API_PORT"}}/api/automations/post-response',
            body: {
              message: 'Hello, world!',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
