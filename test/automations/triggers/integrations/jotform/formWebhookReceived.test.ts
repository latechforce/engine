import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Jotform'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on form webhook received', () => {
    beforeEach(async () => {
      // Add form-specific setup here
    })

    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getAutomationSchema('FormWebhookReceived'),
        services: {
          server: {
            baseUrl: 'http://localhost:6001',
            port: 6001,
          },
        },
      }
      await app.start(config)

      // WHEN
      // Add form-specific trigger test here

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
    })
  })
})
