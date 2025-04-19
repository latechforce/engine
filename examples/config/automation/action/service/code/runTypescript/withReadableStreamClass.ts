import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithReadableStreamClass: Config = {
  name: 'App with a run typescript action with ReadableStream class',
  automations: [
    {
      name: 'getReadableStream',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-readable-stream',
        output: {
          exist: '{{runJavascriptCode.exist}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function () {
            const stream = new ReadableStream()
            return { exist: !!stream }
          }),
        },
      ],
    },
  ],
}
