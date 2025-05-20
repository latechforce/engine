import type { AppSchema } from '@/types'

export const respondImmediatelyGetHttpTrigger: AppSchema = {
  automations: [
    {
      name: 'get',
      trigger: {
        service: 'http',
        event: 'get',
        path: 'get',
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
