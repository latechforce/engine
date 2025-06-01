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
