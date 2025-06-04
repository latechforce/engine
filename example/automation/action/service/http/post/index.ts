import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Make an HTTP POST request',
  description: 'Automation with HTTP POST action and body',
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
          url: '{{env "BASE_URL"}}/api/automations/post-response',
        },
      ],
    },
    {
      name: 'post-response',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'post-response',
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          body: {
            url: '{{ trigger.url }}',
          },
        },
      ],
    },
  ],
} satisfies AppSchema
