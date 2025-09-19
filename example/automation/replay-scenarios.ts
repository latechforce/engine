import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

export default {
  name: 'Replay Scenarios',
  description: 'App with automations designed for testing replay functionality',
  automations: [
    {
      id: 1,
      name: 'intermittent-failure',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/intermittent-failure',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'random-failure',
          params: {
            code: String(function () {
              // Simulate intermittent failure - fails ~50% of the time
              if (Math.random() < 0.5) {
                throw new Error('Intermittent service failure')
              }
              return { message: 'Success after retry', timestamp: Date.now() }
            }),
          },
        },
      ],
    },
    {
      id: 2,
      name: 'external-dependency-failure',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/external-dependency',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'external-api-call',
          params: {
            inputData: {
              shouldFail: process.env.SIMULATE_EXTERNAL_FAILURE ?? 'true',
            },
            code: String(function (context: CodeContext<{ shouldFail: string }>) {
              // Simulate external API failure that might be resolved later
              const shouldFail = context.inputData.shouldFail === 'true'
              if (shouldFail) {
                throw new Error('External API temporarily unavailable')
              }
              return {
                message: 'External API call successful',
                data: { id: '12345', status: 'processed' },
              }
            }),
          },
        },
        {
          service: 'code',
          action: 'run-typescript',
          name: 'process-response',
          params: {
            code: String(function (data: {
              actions: { 'external-api-call': { data: { id: string } } }
            }) {
              const apiResult = data.actions['external-api-call']
              return {
                processedId: apiResult.data.id,
                processedAt: new Date().toISOString(),
              }
            }),
          },
        },
      ],
    },
    {
      id: 3,
      name: 'multi-step-with-failure',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/multi-step-failure',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'step-1-success',
          params: {
            code: String(function () {
              return {
                message: 'Step 1 completed successfully',
                data: { processed: true, count: 10 },
              }
            }),
          },
        },
        {
          service: 'code',
          action: 'run-typescript',
          name: 'step-2-failure',
          params: {
            code: String(function () {
              // This step always fails to test partial run replay
              throw new Error('Step 2 always fails - database connection timeout')
            }),
          },
        },
        {
          service: 'code',
          action: 'run-typescript',
          name: 'step-3-never-reached',
          params: {
            code: String(function (data: {
              actions: { 'step-1-success': { data: { count: number } } }
            }) {
              const step1Result = data.actions['step-1-success']
              return {
                message: 'Step 3 completed',
                totalProcessed: step1Result.data.count * 2,
              }
            }),
          },
        },
      ],
    },
    {
      id: 4,
      name: 'multi-step-with-path-failure',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/multi-step-path-failure',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'step-1-success',
          params: {
            code: String(function () {
              return {
                message: 'Step 1 completed successfully',
                data: { processed: true, count: 10 },
              }
            }),
          },
        },
        {
          service: 'filter',
          action: 'split-into-paths',
          name: 'step-2-paths',
          params: [
            {
              name: 'path-1',
              filter: {
                target: 'text',
                operator: 'exists',
              },
              actions: [
                {
                  service: 'code',
                  action: 'run-typescript',
                  name: 'path-1-step-1-success',
                  params: {
                    code: String(function () {
                      return {
                        message: 'Step 1 completed successfully',
                        data: { processed: true, count: 10 },
                      }
                    }),
                  },
                },
              ],
            },
            {
              name: 'path-2',
              filter: {
                target: 'text',
                operator: 'exists',
              },
              actions: [
                {
                  service: 'code',
                  action: 'run-typescript',
                  name: 'path-2-step-1-success',
                  params: {
                    code: String(function () {
                      return {
                        message: 'Step 1 completed successfully',
                        data: { processed: true, count: 10 },
                      }
                    }),
                  },
                },
                {
                  service: 'code',
                  action: 'run-typescript',
                  name: 'path-2-step-2-failure',
                  params: {
                    code: String(function () {
                      // This step always fails to test partial run replay
                      throw new Error('Step 2 always fails - database connection timeout')
                    }),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies AppSchema
