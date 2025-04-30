export interface ZoomError {
  code?: number | string // Placeholder for error code
  message: string
}

export type EventSubscriptionScope = 'user' | 'account' | 'master_account'

export interface RegisterWebhookParams {
  event: string
  url: string
  account_id: string
  user_id: string
}

export interface CreateEventSubscriptionParams {
  event_subscription_name: string
  event_webhook_url: string
  events: string[]
  subscription_scope: EventSubscriptionScope
  account_id?: string
  user_ids?: string[]
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

export interface GetUserEventSubscriptionsParams {
  page_size?: number
  next_page_token?: string
  user_id: string
  subscription_scope?: EventSubscriptionScope
  account_id: string
}

export interface GetUserEventSubscriptionsResponse {
  next_page_token?: string
  page_size: number
  event_subscriptions: EventSubscription[]
}
