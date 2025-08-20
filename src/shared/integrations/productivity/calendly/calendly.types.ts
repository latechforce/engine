export type WebhookPayload = {
  created_at: string
  created_by: string
  event:
    | 'invitee.created'
    | 'invitee.canceled'
    | 'invitee_no_show.created'
    | 'invitee_no_show.deleted'
    | 'routing_form_submission.created'
  payload: {
    cancel_url: string
    created_at: string
    email: string
    event: string
    name: string
    new_invitee: null | string
    old_invitee: null | string
    questions_and_answers: {
      question: string
      answer: string
      position: number
    }[]
    reschedule_url: string
    rescheduled: boolean
    status: string
    text_reminder_number: null | string
    timezone: string
    tracking: {
      utm_campaign: null | string
      utm_source: null | string
      utm_medium: null | string
      utm_content: null | string
      utm_term: null | string
      salesforce_uuid: null | string
    }
    updated_at: string
    uri: string
    scheduled_event: {
      uri: string
      name: string
      meeting_notes_plain: string
      meeting_notes_html: string
      status: string
      start_time: string
      end_time: string
      event_type: string
      location: {
        type: string
        location: string
        additional_info: string
      }
      invitees_counter: {
        total: number
        active: number
        limit: number
      }
      created_at: string
      updated_at: string
      event_memberships: Array<{
        user: string
        user_email: string
        user_name: string
      }>
      event_guests: Array<{
        email: string
        created_at: string
        updated_at: string
      }>
    }
  }
}

export type ListWebhookSubscriptionsResponse = {
  collection: {
    uri: string
    callback_url: string
    created_at: string // ISO 8601 datetime string
    updated_at: string
    retry_started_at: string
    state: 'active' | 'disabled' | 'paused' // possible known values
    events: string[] // e.g., ['invitee.created']
    scope: 'user' | 'organization' | string // may be limited to these
    organization?: string // URL
    user?: string // URL
    group?: string // URL
    creator: string // URL
  }[]
  pagination: {
    count: number
    next_page: string | null
    previous_page: string | null
    next_page_token: string | null
    previous_page_token: string | null
  }
}

export type CreateWebhookSubscriptionResponse = {
  resource: {
    uri: string
    callback_url: string
    created_at: string // ISO 8601
    updated_at: string
    retry_started_at: string
    state: 'active' | 'disabled' | 'paused'
    events: string[] // e.g., ['invitee.created']
    scope: 'user' | 'organization' | string
    organization?: string
    user?: string
    group?: string
    creator: string
  }
}

export type GetCurrentUserResponse = {
  resource: {
    uri: string
    name: string
    slug: string
    email: string
    scheduling_url: string
    timezone: string
    time_notation: '12h' | '24h'
    avatar_url: string
    created_at: string // ISO 8601 format
    updated_at: string // ISO 8601 format
    current_organization: string
    resource_type: 'User'
    locale: string
  }
}

export type GetEventTypeResponse = {
  resource: {
    uri: string
    name: string
    active: boolean
    booking_method: 'instant' | 'poll'
    slug: string
    scheduling_url: string
    duration: number
    duration_options: number[]
    kind: 'solo' | 'group'
    pooling_type: 'round_robin' | 'collective' | 'multi_pool' | null
    type: 'StandardEventType' | 'AdhocEventType'
    color: string
    created_at: string // ISO date
    updated_at: string // ISO date
    internal_note: string
    description_plain: string
    description_html: string
    profile: {
      type: 'User' | 'Team'
      name: string
      owner: string
    }
    secret: boolean
    deleted_at: string | null
    admin_managed: boolean
    locations: {
      kind:
        | 'ask_invitee'
        | 'custom'
        | 'google_conference'
        | 'gotomeeting_conference'
        | 'inbound_call'
        | 'microsoft_teams_conference'
        | 'outbound_call'
        | 'physical'
        | 'webex_conference'
        | 'zoom_conference'
      location?: string
      phone_number?: string
      additional_info?: string
    }[]
    position: number
    custom_questions: {
      name: string
      type: 'string' | 'text' | 'single_select' | 'multi_select' | 'phone_number' | string
      position: number
      enabled: boolean
      required: boolean
      answer_choices: string[]
      include_other: boolean
    }[]
    locale: 'en' | 'fr' | 'es' | 'de' | 'nl' | 'pt' | 'it' | 'uk'
  }
}
