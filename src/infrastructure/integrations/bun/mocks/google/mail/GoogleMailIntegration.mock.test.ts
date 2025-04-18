import BunTester, { describe, it, expect } from 'bun:test'
import { GoogleMailIntegration } from './GoogleMailIntegration.mock'
import { testGoogleMailIntegration } from '/infrastructure/integrations/common/google/mail/GoogleMailIntegrationTest'

const integration = new GoogleMailIntegration({
  user: 'test',
  password: 'test',
  account: 'test',
  baseUrl: ':memory:',
})

await integration.createToken('test')

testGoogleMailIntegration(BunTester, integration)

describe('listEmails', () => {
  it('should list emails', async () => {
    // WHEN
    const response = await integration.listEmails()

    // THEN
    expect(response.data).toHaveLength(1)
  })
})
