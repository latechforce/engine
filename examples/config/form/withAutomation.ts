import type { CodeRunnerContext, Config } from '/src'

export const configFormWithAutomation: Config = {
  name: 'App with a form and an automation',
  forms: [
    {
      name: 'form',
      path: '/path',
      table: 'table',
      inputs: [
        {
          field: 'single_line_text',
          label: 'Single Line Text',
        },
      ],
    },
  ],
  tables: [
    {
      name: 'table',
      fields: [
        {
          name: 'single_line_text',
          type: 'SingleLineText',
        },
      ],
    },
  ],
  automations: [
    {
      name: 'automation',
      trigger: {
        service: 'Database',
        event: 'RecordCreated',
        table: 'table',
      },
      actions: [
        {
          name: 'automation',
          service: 'Code',
          action: 'RunTypescript',
          input: {
            single_line_text: '{{trigger.fields.single_line_text}}',
          },
          code: String(function (context: CodeRunnerContext<{ single_line_text: string }>) {
            const { single_line_text } = context.inputData
            return { message: `Automation triggered: ${single_line_text}` }
          }),
        },
      ],
    },
  ],
}
