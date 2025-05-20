import type { AppSchema } from '@/types'

export const responseHttpAction: AppSchema = {
  automations: [
    {
      name: 'response',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'response',
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
        },
      ],
    },
  ],
}
