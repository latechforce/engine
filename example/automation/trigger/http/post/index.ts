import type { AppSchema } from '@/types'

export const postHttpTrigger: AppSchema = {
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
}
