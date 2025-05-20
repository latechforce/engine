import type { AppSchema } from '@/types'

export const respondImmediatelyPostHttpTrigger: AppSchema = {
  automations: [
    {
      name: 'post',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'post',
        respondImmediately: true,
      },
      actions: [
        {
          name: 'response',
          service: 'http',
          action: 'response',
          body: {
            message: 'Hello, world!',
          },
        },
      ],
    },
  ],
}
