export interface ZoomError {
  code?: number | string // Placeholder for error code
  message: string
}

export type EventSubscriptionScope = 'user' | 'account' | 'master_account'

export interface CreateEventSubscriptionParams {
  event_subscription_name: string
  event_webhook_url: string
  events: string[]
  subscription_scope: EventSubscriptionScope
  subscriber_id?: string
}

export interface EventSubscription {
  event_subscription_id: string
  events: string[]
  event_subscription_name: string
  event_webhook_url: string
  subscription_scope: EventSubscriptionScope
  created_source: string
  subscriber_id?: string
}
