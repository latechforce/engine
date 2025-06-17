import type { AppSchema } from '@/types'

export const inGuides = false

export const env = {
  API_PORT: 6000,
}

export default {
  name: 'Make an HTTP POST request with environment variables',
  description: 'Automation with HTTP POST action and environment variables',
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
              'X-Custom-Header': '{{env "TEST_HEADER"}}',
            },
          },
        },
      ],
    },
  ],
} satisfies AppSchema
