import { YouCanBookMeIntegration } from './YouCanBookMeIntegration.mock'
import { testYouCanBookMeIntegration } from '/infrastructure/integrations/common/youcanbookme/YouCanBookMeIntegrationTest'
import BunTester from 'bun:test'

export const integration = new YouCanBookMeIntegration({
  account: 'test',
  baseUrl: ':memory:',
  user: {
    username: 'mock-username',
    password: 'mock-password',
  },
})

await integration.createToken('mock-username')

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
      type: 'WEBHOOK',
      status: 'TEMPLATE',
      anchor: 'BOOKING_CREATED',
      offsetMinutes: 0,
      title: 'Booking created API call',
      to: 'https://webhookurl.com',
      subject: 'POST',
      body: '{ "startsAt": "{START-LOCAL-DATE}", "endsAt": "{END-LOCAL-TIME}", "timeZone": "{TIMEZONE}", "firstName": "{FNAME}", "email": "{EMAIL}" }',
    },
  ],
  brandingType: 'PAID_BRANDING',
})

testYouCanBookMeIntegration(BunTester, integration)
