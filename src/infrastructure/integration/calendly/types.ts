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
