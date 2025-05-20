import type { AppSchema } from '@/types'

export const getHttpTrigger: AppSchema = {
  automations: [
    {
      name: 'get',
      trigger: {
        service: 'http',
        event: 'get',
        path: 'get',
      },
      actions: [],
    },
  ],
}
