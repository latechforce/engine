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
  elements: GetLeadNotificationSubscriptionResponse[]
}

export type LeadFormResponseAnswer = {
  questionId: string
  answer: string
}

export type LeadFormResponse = {
  id: string
  formId: string
  submittedAt: number
  answers: LeadFormResponseAnswer[]
}

export type GetLeadFormResponseResponse = {
  id: string
  owner?: {
    organization?: string
    sponsoredAccount?: string
  }
  submitter?: {
    person?: string
  }
  formResponse: LeadFormResponse
  submittedAt: number
  leadType: 'SPONSORED'
}
