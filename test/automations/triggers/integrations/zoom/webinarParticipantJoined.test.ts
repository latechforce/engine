import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationTriggerIntegrationZoomWebinarParticipantJoined } from '/examples/config/automation/trigger/integration/zoom/webinarParticipantJoined'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Zoom'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on webinar participant joined', () => {
    it('should start an automation', async () => {
      // GIVEN
      await app.start(configAutomationTriggerIntegrationZoomWebinarParticipantJoined)
      const eventSubscriptions = await integrations.zoom.getUserEventSubscriptions({
        user_id: 'test123',
        account_id: 'test123',
      })
      const [webhook] = eventSubscriptions.data?.event_subscriptions ?? []
      if (!webhook) throw new Error('No webhook found')

      // WHEN
      await fetch(webhook.event_webhook_url, {
        method: 'POST',
        body: JSON.stringify({
          event: 'webinar.participant_joined',
          payload: {
            account_id: 'abc123',
            object: {
              uuid: 'xyz789',
              participant: {
                id: 'part123',
                user_id: 'test123',
                user_name: 'John Doe',
                email: 'john@example.com',
                join_time: '2023-01-01T12:00:00Z',
              },
              webinar: {
                id: 'web456',
                topic: 'Test Webinar',
                start_time: '2023-01-01T12:00:00Z',
                timezone: 'America/New_York',
              },
            },
          },
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
