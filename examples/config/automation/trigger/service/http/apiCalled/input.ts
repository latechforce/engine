import type { Config } from '/src'

export const configAutomationTriggerServiceHttpApiCalledInput: Config = {
  name: 'App with an automation with a http api called trigger with input',
  automations: [
    {
      name: 'ApiCalledWithTextInput',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run',
        input: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
            },
          },
          required: ['text'],
        },
      },
      actions: [],
    },
  ],
}
