import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithBlobClass: Config = {
  name: 'App with a run typescript action with Blob class',
  automations: [
    {
      name: 'getBlob',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-blob',
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
            const blob = new Blob(['Hello, world!'])
            return { exist: !!blob }
          }),
        },
      ],
    },
  ],
}
