import { CalendlyIntegration } from './CalendlyIntegration.mock'
import { testCalendlyIntegration } from '/infrastructure/integrations/common/calendly/CalendlyIntegrationTest'
import BunTester from 'bun:test'

export const integration = new CalendlyIntegration({
  name: 'test',
  baseUrl: ':memory:',
  user: {
    accessToken: 'https://api.calendly.com/users/123',
  },
})

await integration.createUser({
  uri: 'https://api.calendly.com/users/123',
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

await integration.createWebhookSubscription({
  url: 'https://example.com/webhook1',
  events: ['invitee.created', 'invitee.canceled'],
  organization: 'https://api.calendly.com/organizations/ABCDEF',
  user: undefined,
  scope: 'organization',
})

await integration.createWebhookSubscription({
  url: 'https://example.com/webhook2',
  events: ['invitee.created'],
  organization: 'https://api.calendly.com/organizations/ABCDEF',
  user: 'https://api.calendly.com/users/456',
  scope: 'user',
})

await integration.createWebhookSubscription({
  url: 'https://example.com/webhook3',
  events: ['invitee.canceled'],
  organization: 'https://api.calendly.com/organizations/ABCDEF',
  user: undefined,
  scope: 'organization',
})

await integration.createWebhookSubscription({
  url: 'https://example.com/webhook4',
  events: ['invitee.created'],
  organization: 'https://api.calendly.com/organizations/ABCDEF',
  user: 'https://api.calendly.com/users/789',
  scope: 'user',
})

await integration.createWebhookSubscription({
  url: 'https://example.com/webhook5',
  events: ['invitee.canceled'],
  organization: 'https://api.calendly.com/organizations/ABCDEF',
  user: undefined,
  scope: 'organization',
})

testCalendlyIntegration(BunTester, integration)
