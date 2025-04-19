import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptInput: Config = {
  name: 'App with a run typescript action with input',
  automations: [
    {
      name: 'run-typescript',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run-typescript-with-input',
        input: {
          type: 'object',
          properties: {
            text: { type: 'string' },
          },
          required: ['text'],
        },
        output: {
          message: '{{runJavascriptCode.message}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          input: {
            text: '{{trigger.body.text}}',
          },
          code: String(async function (context: CodeRunnerContext<{ text: string }>) {
            const { text } = context.inputData
            return { message: text }
          }),
        },
      ],
    },
  ],
}
