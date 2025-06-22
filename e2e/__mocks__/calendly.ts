import type {
  ListWebhookSubscriptionsResponse,
  CreateWebhookSubscriptionResponse,
  GetCurrentUserResponse,
  WebhookPayload,
  GetEventTypeResponse,
} from '../../src/integrations/calendly/calendly.types'

export const webhookPayloadInviteCreated: WebhookPayload = {
  created_at: '2020-11-23T17:51:19.000000Z',
  created_by: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
  event: 'invitee.created',
  payload: {
    cancel_url: 'https://calendly.com/cancellations/AAAAAAAAAAAAAAAA',
    created_at: '2020-11-23T17:51:18.327602Z',
    email: 'test@example.com',
    event: 'https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA',
    name: 'John Doe',
    new_invitee: null,
    old_invitee: null,
    questions_and_answers: [],
    reschedule_url: 'https://calendly.com/reschedulings/AAAAAAAAAAAAAAAA',
    rescheduled: false,
    status: 'active',
    text_reminder_number: null,
    timezone: 'America/New_York',
    tracking: {
      utm_campaign: null,
      utm_source: null,
      utm_medium: null,
      utm_content: null,
      utm_term: null,
      salesforce_uuid: null,
    },
    updated_at: '2020-11-23T17:51:18.341657Z',
    uri: 'https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAAAA',
    scheduled_event: {
      uri: 'https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2',
      name: '15 Minute Meeting',
      meeting_notes_plain: 'Internal meeting notes',
      meeting_notes_html: '<p>Internal meeting notes</p>',
      status: 'active',
      start_time: '2019-08-24T14:15:22.123456Z',
      end_time: '2019-08-24T14:15:22.123456Z',
      event_type: 'https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2',
      location: {
        type: 'physical',
        location: 'string',
        additional_info: 'string',
      },
      invitees_counter: {
        total: 0,
        active: 0,
        limit: 0,
      },
      created_at: '2019-01-02T03:04:05.678123Z',
      updated_at: '2019-01-02T03:04:05.678123Z',
      event_memberships: [
        {
          user: 'https://api.calendly.com/users/GBGBDCAADAEDCRZ2',
          user_email: 'user@example.com',
          user_name: 'John Smith',
        },
      ],
      event_guests: [
        {
          email: 'user@example.com',
          created_at: '2019-08-24T14:15:22.123456Z',
          updated_at: '2019-08-24T14:15:22.123456Z',
        },
      ],
    },
  },
}

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

export const getEventTypeResponse: GetEventTypeResponse = {
  resource: {
    uri: 'https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA',
    name: '15 Minute Meeting',
    slug: '15-minute-meeting',
    created_at: '2019-01-02T03:04:05.678123Z',
    updated_at: '2019-08-07T06:05:04.321123Z',
    active: true,
    booking_method: 'instant',
    scheduling_url: 'https://calendly.com/15-minute-meeting',
    duration: 15,
    duration_options: [15, 30, 60],
    kind: 'solo',
    pooling_type: null,
    type: 'StandardEventType',
    color: '#000000',
    internal_note: 'Internal note',
    description_plain: 'Internal note',
    description_html: '<p>Internal note</p>',
    profile: {
      type: 'User',
      name: 'John Doe',
      owner: 'https://api.calendly.com/users/AAAAAAAAAAAAAAAA',
    },
    secret: false,
    deleted_at: null,
    admin_managed: false,
    locations: [],
    position: 0,
    custom_questions: [],
    locale: 'en',
  },
}
