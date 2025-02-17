import BunTester, { describe, it, expect } from 'bun:test'
import { GoogleMailIntegration } from './GoogleMailIntegration.mock'
import { testGoogleMailIntegration } from '/infrastructure/integrations/common/google/mail/GoogleMailIntegrationTest'

const integration = new GoogleMailIntegration({
  user: 'test@test.com',
  password: ':memory:',
})

testGoogleMailIntegration(BunTester, integration)

describe('listEmails', () => {
  it('should list emails', async () => {
    // WHEN
    const emails = await integration.listEmails()

    // THEN
    expect(emails).toHaveLength(1)
  })
})
