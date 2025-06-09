import type { AppSchema, CodeContext } from '@/types'

export const inGuides = false

type InputData = {
  apiKey: string
}

export const env = {
  API_KEY: '1234567890',
}

export default {
  name: 'Run action with env variables in inputData',
  description: 'Automation with run action with env variables in inputData',
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'run-typescript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          runTypescriptCode: {
            inputData: {
              apiKey: '{{env "API_KEY"}}',
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
