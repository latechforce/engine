import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Replay Demo Test',
  description: 'Simple automation for demonstrating replay functionality',
  automations: [
    {
      id: 1,
      name: 'replay-demo-automation',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/replay-demo-automation',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'simple-task',
          params: {
            code: String(function () {
              const timestamp = new Date().toISOString()
              const randomId = Math.random().toString(36).substring(7)

              return {
                message: 'Task completed successfully',
                timestamp: timestamp,
                executionId: randomId,
                status: 'completed',
              }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
