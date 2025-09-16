export type PageSubscription = {
  category: string
  link: string
  name: string
  id: string
  subscribed_fields?: string[]
  tasks?: string[]
}

export type ListPageSubscriptionsResponse = {
  data: PageSubscription[]
}

export type SubscribePageToLeadgenResponse = {
  success: boolean
}

export type CreateAppSubscriptionResponse = {
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

export type LeadgenFieldData = {
  name: string
  values: string[]
}

export type GetLeadgenDataResponse = {
  id: string
  ad_id: string
  form_id: string
  field_data: LeadgenFieldData[]
  created_time: string
  page_id: string
  adgroup_id: string
  campaign_id: string
  is_organic?: boolean
  partner_name?: string
  platform?: string
  retailer_item_id?: string
}

export type Account = {
  id: string
  name: string
  category: string
  tasks?: string[]
  access_token?: string
}

export type GetAccountsResponse = {
  data: Account[]
  paging?: {
    cursors?: {
      before?: string
      after?: string
    }
    next?: string
    previous?: string
  }
}

export type LeadgenForm = {
  id: string
  name: string
  status: string
  locale: string
  questions: Array<{
    key: string
    label: string
    type: string
  }>
}

export type GetLeadgenFormsResponse = {
  data: LeadgenForm[]
  paging?: {
    cursors?: {
      before?: string
      after?: string
    }
    next?: string
    previous?: string
  }
}

export type Lead = {
  id: string
  created_time: string
  ad_id: string
  form_id: string
  field_data: LeadgenFieldData[]
}

export type GetFormLeadsResponse = {
  data: Lead[]
  paging?: {
    cursors?: {
      before?: string
      after?: string
    }
    next?: string
    previous?: string
  }
}
