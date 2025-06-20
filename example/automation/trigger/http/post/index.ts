import type { AppSchema } from '@/types'

export const inGuides = true

export default {
  name: 'Trigger an automation with an HTTP POST request',
  description: 'Automation with HTTP POST trigger',
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
      actions: [],
    },
  ],
} satisfies AppSchema
