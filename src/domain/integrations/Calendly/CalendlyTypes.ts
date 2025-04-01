export type CalendlyError = {
  error: string
  errorDescription: string
}

export type CreateWebhookSubscriptionParams = {
  url: string
  events: WebhookEvents[]
  organization?: CalendlyOrganizationResourceUrl
  user?: CalendlyUserResourceUrl
  scope?: CalendlyScope
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
