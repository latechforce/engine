import type { AppSchema } from '@/types'

export const inGuides = false

export const env = {
  API_PORT: 6000,
}

export default {
  name: 'Make an HTTP GET request',
  description: 'Automation with HTTP GET action',
  automations: [
    {
      id: 1,
      name: 'get',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'get',
        },
      },
      actions: [
        {
          name: 'request',
          service: 'http',
          action: 'get',
          getHttp: {
            url: 'http://localhost:{{env "API_PORT"}}/api/automations/get-response',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
