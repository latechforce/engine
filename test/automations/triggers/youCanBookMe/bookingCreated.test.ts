import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationConfig } from '/test/config'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['YouCanBookMe'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on booking created', () => {
    beforeEach(async () => {
    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getAutomationConfig('YouCanBookMeBookingCreated'),
        server: {
          baseUrl: 'http://localhost:3001',
          port: 3001,
        },
      }
      await app.start(config)

      const currentProfileResponse = await integrations.youcanbookme.currentProfile()

      if (currentProfileResponse.error) {
        throw new Error('YouCanBookMe username is not configured')
      }

      const currentProfile = currentProfileResponse.data

      const webhookActions = currentProfile.actions.filter((action) => action.type === 'WEBHOOK')

      if (webhookActions.length === 0) {
        throw new Error('No webhook actions found')
      }

      const webhook = webhookActions[0]

      // WHEN
      await fetch(webhook.to, {
        method: 'POST',
        body: JSON.stringify({
          startsAt: '2024-03-20T10:00:00Z',
          endsAt: '2024-03-20T11:00:00Z',
          timeZone: 'Europe/Paris',
          firstName: 'John',
          email: 'john@example.com',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // THEN
      const histories = await drivers.database.waitForAutomationsHistories()
      expect(histories).toHaveLength(1)
    })
  })
})
