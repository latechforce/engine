import type { AppSchema } from '@/types'

export const inGuides = true

export const env = {
  API_PORT: 6000,
}

export default {
  name: 'Make an HTTP GET request',
  description: 'Automation with HTTP GET action',
  automations: [
    {
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
          url: 'http://localhost:{{env "API_PORT"}}/api/automations/get-response',
        },
      ],
    },
  ],
} satisfies AppSchema
