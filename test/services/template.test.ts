import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/src'
import { configServiceTemplate } from '/examples/config/service/template'
import { configServiceTemplateDefaultValue } from '/examples/config/service/template/defaultValue'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should return the name', async () => {
      // GIVEN
      const { url } = await app.start(configServiceTemplate)

      // WHEN
      const response = await request.post(`${url}/api/automation/send-email`, {
        name: 'John Doe',
      })

      // THEN
      expect(response.name).toBe('John Doe')
    })

    it('should throw an error if the name is not linked', async () => {
      // GIVEN
      const newConfig: Config = {
        ...configServiceTemplate,
        automations: [
          {
            ...configServiceTemplate.automations![0],
            actions: [
              {
                name: 'runCode',
                service: 'Code',
                action: 'RunTypescript',
                input: {
                  name: '{{trigger.name}}',
                },
                code: String(function (context: CodeRunnerContext<{ name: string }>) {
                  return { name: context.inputData.name }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(newConfig)

      // WHEN
      const response = await request.post(`${url}/api/automation/send-email`, {
        name: 'John Doe',
      })

      // THEN
      expect(response.error).toBe('{{trigger.name}} is not defined')
    })

    it('should return the default name', async () => {
      // GIVEN
      const { url } = await app.start(configServiceTemplateDefaultValue)

      // WHEN
      const response = await request.post(`${url}/api/automation/send-email`, {
        name: 'John Doe',
      })

      // THEN
      expect(response.name).toBe('Jane Doe')
    })
  })
})
