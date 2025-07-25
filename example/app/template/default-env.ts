import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

type InputData = {
  apiKey: string
}

export default {
  name: 'Run action with default env variables in inputData',
  description: 'Automation with run action with default env variables in inputData',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: 'run-typescript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'params',
          params: {
            inputData: {
              apiKey: '{{env "API_KEY" "9876543210"}}',
            },
            code: String(function (context: CodeContext<InputData>) {
              const { apiKey } = context.inputData
              return { apiKey }
            }),
          },
        },
      ],
    },
  ],
} satisfies AppSchema
