import type { AppSchema } from '@/types'

export const env = {
  API_PORT: 6000,
}

export default {
  name: 'HTTP POST action with headers',
  description: 'Automation with HTTP POST action and headers',
  automations: [
    {
      id: 1,
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'post',
        },
      },
      actions: [
        {
          name: 'request',
          service: 'http',
          action: 'post',
          postHttp: {
            url: 'http://localhost:{{env "API_PORT"}}/api/automations/post-response',
            headers: {
              'X-Custom-Header': 'test',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
