import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'

const mock = new Mock(Tester, { integrations: ['GoogleMail'] })

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should send an email', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        engine: '1.0.0',
        automations: [
          {
            name: 'sendEmail',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'send-email',
              output: {
                id: '{{sendEmail.id}}',
              },
            },
            actions: [
              {
                name: 'sendEmail',
                integration: 'GoogleMail',
                action: 'SendEmail',
                email: {
                  from: 'test@test.com',
                  to: 'test@test.com',
                  subject: 'ENGINE - TEST',
                  text: 'ENGINE - TEST',
                  html: 'ENGINE - TEST',
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
      expect(response.id).toBeDefined()
    })
  })
})
