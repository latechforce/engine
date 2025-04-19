import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithXml2jsPackage: Config = {
  name: 'App with a run typescript action with xml2js package',
  automations: [
    {
      name: 'parseXml',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'parse-xml',
        output: {
          result: {
            json: '{{runJavascriptCode.result}}',
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
              packages: { xml2js },
            } = context
            const parser = new xml2js.Parser({
              trim: true,
              explicitArray: false,
            })
            const xml =
              '<result><root><item>Value1</item><item>Value2</item></root><key> value </key></result>'
            const { result } = await parser.parseStringPromise(xml)
            return { result }
          }),
        },
      ],
    },
  ],
}
