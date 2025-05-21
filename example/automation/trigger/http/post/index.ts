import type { AppSchema } from '@/types'

export default {
  name: 'HTTP POST trigger',
  description: 'Automation with http post trigger',
  automations: [
    {
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'post',
      },
      actions: [],
    },
  ],
} satisfies AppSchema
