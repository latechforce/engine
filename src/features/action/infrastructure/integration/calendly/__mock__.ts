import type {
  ListWebhookSubscriptionsResponse,
  CreateWebhookSubscriptionResponse,
  GetCurrentUserResponse,
} from './types'

export const listWebhookSubscriptionsResponse: ListWebhookSubscriptionsResponse = {
  collection: [
    {
      uri: 'https://api.calendly.com/webhook_subscriptions/AAAAAAAAAAAAAAAA',
      callback_url: 'https://blah.foo/bar',
      created_at: '2019-08-24T14:15:22.123456Z',
      updated_at: '2019-08-24T14:15:22.123456Z',
      retry_started_at: '2019-08-24T14:15:22.123456Z',
      state: 'active',
      events: ['invitee.created'],
      scope: 'user',
      organization: 'https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA',
      user: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
      group: 'https://api.calendly.com/groups/AAAAAAAAAAAAAAAA',
      creator: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
    },
  ],
  pagination: {
    count: 20,
    next_page:
      'https://api.calendly.com/webhook_subscriptions?count=1&page_token=sNjq4TvMDfUHEl7zHRR0k0E1PCEJWvdi',
    previous_page:
      'https://api.calendly.com/webhook_subscriptions?count=1&page_token=VJs2rfDYeY8ahZpq0QI1O114LJkNjd7H',
    next_page_token: 'sNjq4TvMDfUHEl7zHRR0k0E1PCEJWvdi',
    previous_page_token: 'VJs2rfDYeY8ahZpq0QI1O114LJkNjd7H',
  },
}

export const createWebhookSubscriptionResponse: CreateWebhookSubscriptionResponse = {
  resource: {
    uri: 'https://api.calendly.com/webhook_subscriptions/AAAAAAAAAAAAAAAA',
    callback_url: 'https://blah.foo/bar',
    created_at: '2019-08-24T14:15:22.123456Z',
    updated_at: '2019-08-24T14:15:22.123456Z',
    retry_started_at: '2019-08-24T14:15:22.123456Z',
    state: 'active',
    events: ['invitee.created'],
    scope: 'user',
    organization: 'https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA',
    user: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
    group: 'https://api.calendly.com/groups/AAAAAAAAAAAAAAAA',
    creator: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
  },
}

export const getCurrentUserResponse: GetCurrentUserResponse = {
  resource: {
    uri: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
    name: 'John Doe',
    slug: 'acmesales',
    email: 'user@example.com',
    scheduling_url: 'https://calendly.com/acmesales',
    timezone: 'America/New York',
    time_notation: '12h',
    avatar_url: 'https://01234567890.cloudfront.net/uploads/user/avatar/0123456/a1b2c3d4.png',
    created_at: '2019-01-02T03:04:05.678123Z',
    updated_at: '2019-08-07T06:05:04.321123Z',
    current_organization: 'https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA',
    resource_type: 'User',
    locale: 'en',
  },
}
