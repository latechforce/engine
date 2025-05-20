import type { AppSchema } from '@/types'

export const errorRunTypescriptCodeAction: AppSchema = {
  automations: [
    {
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'run-typescript',
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          code: String(function () {
            throw new Error('This is a test error')
          }),
        },
      ],
    },
  ],
}
