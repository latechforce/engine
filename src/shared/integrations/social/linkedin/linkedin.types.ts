export type GetLeadNotificationSubscriptionResponse = {
  owner: {
    organization: string
  }
  id: number
  leadType: 'SPONSORED'
  versionedForm: string
  associatedEntity?: {
    event?: string
  }
  webhook?: string
}

export type ListLeadNotificationSubscriptionsResponse = {
  results?: GetLeadNotificationSubscriptionResponse[]
  elements?: GetLeadNotificationSubscriptionResponse[]
  paging?: {
    count: number
    start: number
    total: number
  }
}
