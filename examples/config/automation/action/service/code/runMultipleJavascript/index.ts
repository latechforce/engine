import type { Config } from '/src'

export const configAutomationActionServiceCodeRunMultipleJavascript: Config = {
  name: 'App',
  automations: [
    {
      name: 'JSHelloWorld',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'js-hello-world',
        output: {
          message: '{{runJavascriptCode.message}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunJavascript',
          name: 'runJavascriptCode',
          code: String(async function () {
            return { message: 'Hello, world!' }
          }),
        },
      ],
    },
    {
      name: 'runJavascript',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'run-javascript',
        output: {
          message: '{{step2.titi}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunJavascript',
          name: 'step1',
          code: String(async function () {
            return { message: 'Hello, world!' }
          }),
        },
        {
          service: 'Code',
          action: 'RunJavascript',
          name: 'step2',
          input: {
            step1: '{{step1.message}}',
          },
          code: String(async function (params: { inputData: { step1: string } }) {
            return { titi: params.inputData.step1 + ' - step 2' }
          }),
        },
      ],
    },
  ],
  services: {
    loggers: [
      {
        type: 'Console',
        level: 'debug',
      },
    ],
    database: {
      type: 'SQLite',
      url: './database.sqlite',
    },
    server: {
      port: 3000,
    },
  },
}
