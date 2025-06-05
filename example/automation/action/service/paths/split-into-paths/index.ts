import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Paths action with split into paths',
  description: 'Automation with run Paths action with split into paths',
  automations: [
    {
      id: 1,
      name: 'run-paths',
      trigger: {
        service: 'http',
        event: 'post',
        path: '/run-paths',
      },
      actions: [
        {
          name: 'splitIntoPaths',
          service: 'paths',
          action: 'split-into-paths',
          paths: [
            {
              name: 'path1',
              conditions: {
                input: '{{ trigger.body.name }}',
                operator: 'exists',
              },
              actions: [
                {
                  name: 'runTypescript1',
                  service: 'code',
                  action: 'run-typescript',
                  code: String(function () {
                    return { success: true }
                  }),
                },
              ],
            },
            {
              name: 'path2',
              conditions: {
                input: '{{ trigger.body.name }}',
                operator: 'does-not-exist',
              },
              actions: [
                {
                  name: 'runTypescript2',
                  service: 'code',
                  action: 'run-typescript',
                  code: String(function () {
                    return { success: true }
                  }),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies AppSchema
