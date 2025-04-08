import { YouCanBookMeIntegration } from './YouCanBookMeIntegration.mock'
import { testYouCanBookMeIntegration } from '/infrastructure/integrations/common/youcanbookme/YouCanBookMeIntegrationTest'
import BunTester from 'bun:test'

export const integration = new YouCanBookMeIntegration({
  baseUrl: ':memory:',
  user: {
    username: 'mock-username',
    password: 'mock-password',
  },
})

await integration.createProfile({
  id: 'mock-username',
  createdBy: 'mock-creator',
  accountId: 'mock-account-123',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  title: 'Mock Profile Title',
  description: 'This is a mock profile description',
  subdomain: 'mock-subdomain',
  logo: 'https://mock-logo.png',
  timeZoneOverride: false,
  captchaActive: false,
  accessCode: 'mock-access-code',
  timeZone: 'Europe/Paris',
  locale: 'fr-FR',
  profileId: 'profile-123',
  status: 'ONLINE',
  actions: [
    {
      id: 'action-123',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      accountId: 'mock-account-123',
      profileId: 'profile-123',
      bookingId: 'booking-123',
      type: 'WEBHOOK',
      status: 'SUCCEEDED',
      anchor: 'BOOKING_CREATED',
      offsetMinutes: 0,
      firedAt: new Date().toISOString(),
      title: 'Booking Confirmation',
      to: 'customer@example.com',
      fromName: 'Mock Business',
      fromAddress: 'bookings@mockbusiness.com',
      subject: 'Your booking is confirmed',
      body: 'Thank you for booking with us!',
      creditsUsed: 1,
      attachIcs: true,
      headers: {},
      timeZone: 'Europe/Paris',
      displayTimeZone: 'Europe/Paris',
      withinQuota: true,
      ycbmBranded: false,
      failureCode: '',
    },
  ],
  brandingType: 'PAID_BRANDING',
})

testYouCanBookMeIntegration(BunTester, integration)
