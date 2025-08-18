import type { AppSchema } from '@/types'

export const inGuides = false

export default {
  name: 'Run Paths action with split into paths and error',
  description: 'Automation with run Paths action with split into paths and error',
  automations: [
    {
      id: 1,
      name: 'run-paths',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/run-paths',
        },
      },
      actions: [
        {
          name: 'splitIntoPaths',
          service: 'filter',
          action: 'split-into-paths',
          params: [
            {
              name: 'path1',
              filter: {
                target: '{{ trigger.body.name }}',
                operator: 'does-not-exist',
              },
              actions: [
                {
                  name: 'runTypescript1',
                  service: 'code',
                  action: 'run-typescript',
                  params: {
                    code: String(function () {
                      return { success: true }
                    }),
                  },
                },
                {
                  name: 'runTypescript2',
                  service: 'code',
                  action: 'run-typescript',
                  params: {
                    code: String(function () {
                      throw new Error('Error')
                    }),
                  },
                },
              ],
            },
            {
              name: 'path2',
              filter: {
                target: '{{ trigger.body.name }}',
                operator: 'contains',
                value: 'Jane',
              },
              actions: [
                {
                  name: 'runTypescript2',
                  service: 'code',
                  action: 'run-typescript',
                  params: {
                    code: String(function () {
                      return { success: true }
                    }),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'runTypescript3',
          service: 'code',
          action: 'run-typescript',
          params: {
            code: String(function () {
              return { success: true }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
