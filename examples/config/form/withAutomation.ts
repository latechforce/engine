import type { CodeRunnerContext, Config } from '/src'

export const withAutomation: Config = {
  name: 'App with a form and an automation',
  forms: [
    {
      name: 'user',
      path: '/user',
      table: 'users',
      inputs: [
        {
          field: 'name',
          label: 'Name',
        },
      ],
    },
  ],
  tables: [
    {
      name: 'users',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
      ],
    },
  ],
  automations: [
    {
      name: 'userCreated',
      trigger: {
        service: 'Database',
        event: 'RecordCreated',
        table: 'users',
      },
      actions: [
        {
          name: 'userCreated',
          service: 'Code',
          action: 'RunTypescript',
          input: {
            name: '{{trigger.fields.name}}',
          },
          code: String(function (context: CodeRunnerContext<{ name: string }>) {
            const { name } = context.inputData
            return { message: `User created: ${name}` }
          }),
        },
      ],
    },
  ],
}
