import type { Config, CodeRunnerContext } from '/src'

export const template: Config = {
  name: 'App with a template variable',
  automations: [
    {
      name: 'sendEmail',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'send-email',
        input: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
        },
        output: {
          name: '{{runCode.name}}',
        },
      },
      actions: [
        {
          name: 'runCode',
          service: 'Code',
          action: 'RunTypescript',
          input: {
            name: '{{trigger.body.name}}',
          },
          code: String(function (context: CodeRunnerContext<{ name: string }>) {
            return { name: context.inputData.name }
          }),
        },
      ],
    },
  ],
}
