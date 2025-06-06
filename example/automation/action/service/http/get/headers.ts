import type { AppSchema } from '@/types'

export const inGuides = false

export const env = {
  API_PORT: 6000,
}

export default {
  name: 'Make an HTTP GET request with headers',
  description: 'Automation with HTTP GET action and headers',
  automations: [
    {
      id: 1,
      name: 'get',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'get',
      },
      actions: [
        {
          name: 'request',
          service: 'http',
          action: 'get',
          url: 'http://localhost:{{env "API_PORT"}}/api/automations/post-response',
          headers: {
            'X-Custom-Header': 'test',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
