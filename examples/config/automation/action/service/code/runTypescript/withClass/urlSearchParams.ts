import type { Config } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithURLSearchParamsClass: Config = {
  name: 'App with a run typescript action with URLSearchParams class',
  automations: [
    {
      name: 'getURLSearchParams',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-param',
        output: {
          param: '{{runJavascriptCode.param}}',
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function () {
            const param = new URLSearchParams('a=1').get('a')
            return { param }
          }),
        },
      ],
    },
  ],
}
