export interface YouCanBookMeError {
  code: string
  errors: Array<{
    code: string
    message: string
    object: string
    field: string
    formFieldNumber: string
    formType: string
  }>
  httpStatusCode: number
  httpCode: number
  status: string
  message: string
  type: string
}

export type YouCanBookMeActionAnchor =
  | 'BOOKING_CREATED'
  | 'BOOKING_RESCHEDULED'
  | 'BOOKING_CANCELLED'
  | 'BOOKING_RESCHEDULED_BY_OWNER'
  | 'BOOKING_RESCHEDULED_BY_BOOKER'
  | 'BOOKING_CANCELLED_BY_OWNER'
  | 'BOOKING_CANCELLED_BY_BOOKER'
  | 'BOOKING_ACCEPTED'
  | 'BOOKING_REJECTED'
  | 'BOOKING_STARTS'
  | 'BOOKING_ENDS'
  | 'NO_SHOW'
  | 'booked'
  | 'rescheduled'
  | 'cancelled'
  | 'start'
  | 'end'

export type YouCanBookMeWebhookAction = {
  type: 'WEBHOOK'
  status: 'TEMPLATE'
  anchor: YouCanBookMeActionAnchor
  offsetMinutes: number
  title: string
  to: string
  subject: 'POST'
  body: string
}

export type YouCanBookMeAction = YouCanBookMeWebhookAction

export interface YouCanBookMeProfile {
  id: string
  createdBy: string
  accountId: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  subdomain: string
  logo: string
  timeZoneOverride: boolean
  captchaActive: boolean
  accessCode: string
  timeZone: string
  locale: string
  profileId: string
  status: 'ONLINE' | 'OFFLINE'
  actions: YouCanBookMeAction[]
  brandingType: 'NO_BRANDING' | 'PAID_BRANDING' | 'FREE_BRANDING'
}
