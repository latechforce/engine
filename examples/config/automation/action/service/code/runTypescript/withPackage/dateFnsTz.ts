import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithDateFnsTzPackage: Config = {
  name: 'App with a run typescript action with dateFnsTz package',
  automations: [
    {
      name: 'getDateTz',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-date-tz',
        output: {
          exist: {
            boolean: '{{runJavascriptCode.exist}}',
          },
        },
      },
      actions: [
        {
          service: 'Code',
          action: 'RunTypescript',
          name: 'runJavascriptCode',
          code: String(async function (context: CodeRunnerContext) {
            const {
              packages: { dateFnsTz },
            } = context
            const exist = !!dateFnsTz.getTimezoneOffset
            return { exist }
          }),
        },
      ],
    },
  ],
}
