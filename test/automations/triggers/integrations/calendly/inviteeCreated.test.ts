import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database'], integrations: ['Calendly'] })

mock.request(({ app, drivers, integrations }) => {
  describe('on invitee created', () => {
    beforeEach(async () => {
      await integrations.calendly.createUser({
        uri: 'test',
        name: 'John Doe',
        email: 'john@example.com',
        scheduling_url: 'https://calendly.com/johndoe',
        timezone: 'America/New_York',
        avatar_url: 'https://example.com/avatar.jpg',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        current_organization: 'https://api.calendly.com/organizations/ABCDEF',
        slug: 'johndoe',
        resource_type: 'user',
        locale: 'en',
      })
    })

    it('should start an automation', async () => {
      // GIVEN
      const config = {
        ...getAutomationSchema('CalendlyInviteeCreated'),
        server: {
          baseUrl: 'http://localhost:6001',
          port: 6001,
        },
      }
      await app.start(config)
      const response = await integrations.calendly.listWebhookSubscriptions({
        organization: 'https://api.calendly.com/organizations/ABCDEF',
        scope: 'organization',
      })
      const [webhook] = response.data?.collection ?? []
      if (!webhook) throw new Error('No webhook found')

      // WHEN
      await fetch(webhook.callback_url, {
        method: 'POST',
        body: JSON.stringify({
          event: 'invitee.created',
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
