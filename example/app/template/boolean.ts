import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

type InputData = {
  success: boolean
}

export default {
  name: 'Run action with inputData parsed in boolean',
  description: 'Automation with run action with inputData parsed in boolean',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'run-typescript',
          requestBody: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
            },
            required: ['success'],
            additionalProperties: false,
          },
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          runTypescriptCode: {
            inputData: {
              success: '{{boolean trigger.body.success}}',
            },
            code: String(function (context: CodeContext<InputData>) {
              const { success } = context.inputData
              return { success }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
