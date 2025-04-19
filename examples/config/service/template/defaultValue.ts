import type { Config, CodeRunnerContext } from '/src'

export const configServiceTemplateDefaultValue: Config = {
  name: 'App with a template variable with a default value',
  automations: [
    {
      name: 'sendEmail',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'send-email',
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
            name: '{{trigger.body.name "Jane Doe"}}',
          },
          code: String(function (context: CodeRunnerContext<{ name: string }>) {
            return { name: context.inputData.name }
          }),
        },
      ],
    },
  ],
}
