import type { AppSchema } from '@/types'

export const env = {
  API_PORT: 6000,
}

export default {
  name: 'HTTP POST action with headers',
  description: 'Automation with HTTP POST action and headers',
  automations: [
    {
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'post',
      },
      actions: [
        {
          name: 'request',
          service: 'http',
          action: 'post',
          url: 'http://localhost:{{env "API_PORT"}}/api/automations/post-response',
          headers: {
            'X-Custom-Header': '{{env "TEST_HEADER" "test"}}',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
