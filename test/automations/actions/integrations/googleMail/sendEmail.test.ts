import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionIntegrationGoogleMailSendEmail } from '/examples/config/automation/action/integration/googlemail/sendEmail'

const mock = new Mock(Tester, { integrations: ['GoogleMail'] })

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should send an email', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionIntegrationGoogleMailSendEmail)

      // WHEN
      const response = await request.post(`${url}/api/automation/send-email`)

      // THEN
      expect(response.id).toBeDefined()
    })

    it('should throw an error if the to is not a valid email', async () => {
      // GIVEN
      const config = {
        ...configAutomationActionIntegrationGoogleMailSendEmail,
        automations: [
          {
            ...configAutomationActionIntegrationGoogleMailSendEmail.automations![0],
            actions: [
              {
                ...configAutomationActionIntegrationGoogleMailSendEmail.automations![0].actions[0],
                email: {
                  ...(
                    configAutomationActionIntegrationGoogleMailSendEmail.automations![0]
                      .actions[0] as any
                  ).email,
                  to: '{{trigger.email}}',
                },
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/send-email`)

      // THEN
      expect(response.error).toBeDefined()
      expect(response.error).toBe('{{trigger.email}} is not defined')
    })
  })
})
