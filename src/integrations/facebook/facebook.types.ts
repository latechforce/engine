export type PageSubscription = {
  category: string
  link: string
  name: string
  id: string
}

export type ListPageSubscriptionsResponse = {
  data: PageSubscription[]
}

export type SubscribePageToLeadgenResponse = {
  success: boolean
}

export type AppSubscription = {
  object: string
  callback_url: string
  fields: string[]
}

export type ListAppSubscriptionsResponse = {
  data: AppSubscription[]
}
