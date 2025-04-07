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

export interface Profile {
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
  actions: Array<{
    id: string
    created: string
    updated: string
    accountId: string
    profileId: string
    bookingId: string
    type: 'ZAP' | 'WEBHOOK' | 'EMAIL' | 'SMS' | 'SALESFORCE_TASK' | 'SALESFORCE_UPSERT'
    status: 'PREDICTION' | 'TEMPLATE' | 'OVERRIDEN' | 'SKIPPED' | 'SUCCEEDED' | 'FAILED' | 'RETRY'
    anchor:
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
    offsetMinutes: number
    firedAt: string
    title: string
    to: string
    fromName: string
    fromAddress: string
    subject: string
    body: string
    creditsUsed: number
    attachIcs: boolean
    headers: Record<string, string>
    failureCode: string
    displayTimeZone: string
    withinQuota: boolean
    timeZone: string
    ycbmBranded: boolean
  }>
  brandingType: 'NO_BRANDING' | 'PAID_BRANDING' | 'FREE_BRANDING'
}
