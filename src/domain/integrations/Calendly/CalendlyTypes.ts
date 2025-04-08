export type CalendlyError = {
  title: string
  message: string
}

export type CreateWebhookSubscriptionParams = {
  url: string
  events: WebhookEvents[]
  organization: CalendlyOrganizationResourceUrl
  user?: CalendlyUserResourceUrl
  scope: CalendlyScope
}

export type CreateWebhookSubscriptionResponse = {
  uri: string
  callbackUrl: string
  createdAt: string
  updatedAt: string
  retryStartedAt: string | null
  state: CalendlyWebhookState
  events: WebhookEvents[]
  scope: CalendlyScope
  organization: CalendlyOrganizationResourceUrl
  user: CalendlyUserResourceUrl | null
  creator: string
}

export type CalendlyOrganizationResourceUrl = string

export type CalendlyUserResourceUrl = string

export type CalendlyScope = 'organization' | 'user'

export type CalendlyWebhookState = 'active' | 'disabled'

export type WebhookEvents =
  | 'invitee.created'
  | 'invitee.canceled'
  | 'invitee_no_show.created'
  | 'invitee_no_show.deleted'
  | 'routing_form_submission.created'

export type ListWebhookSubscriptionsParams = {
  organization: CalendlyOrganizationResourceUrl
  user?: CalendlyUserResourceUrl
  scope: CalendlyScope
  count?: number
  pageToken?: string
}

export type ListWebhookSubscriptionsResponse = {
  collection: WebhookSubscriptionItem[]
  pagination: {
    count: number
    next_page: string | null
    previous_page: string | null
    next_page_token: string | null
    previous_page_token: string | null
  }
}

export type WebhookSubscriptionItem = {
  uri: string
  callback_url: string
  created_at: string
  updated_at: string
  retry_started_at: string | null
  state: CalendlyWebhookState
  events: WebhookEvents[]
  scope: CalendlyScope
  organization: string
  user: string | null
  creator: string
}

export type CalendlyUserResponse = {
  resource: CalendlyUser
}

export type CalendlyUser = {
  uri: string
  name: string
  slug: string
  email: string
  scheduling_url: string
  timezone: string
  avatar_url: string
  created_at: string
  updated_at: string
  current_organization: string
  resource_type: string
  locale: string
}

export type GetWebhookSubscriptionParams = {
  webhook_uri: string
}

export type GetWebhookSubscriptionResponse = {
  resource: {
    uri: string
    callback_url: string
    created_at: string
    updated_at: string
    retry_started_at: string | null
    state: string
    events: string[]
    scope: string
    organization: string
    user: string
    creator: string
  }
}

export type DeleteWebhookSubscriptionParams = {
  webhook_uri: string
}
