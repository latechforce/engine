import { expect, test } from '@/e2e/fixtures'
import type { RunDto } from '../../../../../src/features/run/application/dto/run.dto'
import { createHmac } from 'crypto'
import { connectTo } from '@/e2e/steps'

test.describe('LinkedIn webhook validation', () => {
  test('should respond with correctly computed challengeResponse when LinkedIn sends GET validation request', async ({
    startExampleApp,
  }) => {
    // GIVEN: LinkedIn automation configured with known client secret
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })
    await connectTo('linkedin-ads', page)

    // WHEN: LinkedIn sends GET validation challenge
    const challengeCode = 'test-challenge-abc123'
    const webhookUrl = `${url}/api/automations/1?challengeCode=${challengeCode}`

    const startTime = Date.now()
    const validationResponse = await page.request.get(webhookUrl)
    const responseTime = Date.now() - startTime

    // THEN: Should respond with LinkedIn compliant validation response
    expect(validationResponse.ok()).toBeTruthy()
    expect(validationResponse.status()).toBe(200)
    expect(validationResponse.headers()['content-type']).toContain('application/json')
    expect(responseTime).toBeLessThan(3000) // LinkedIn requires response within 3 seconds

    const responseBody = await validationResponse.json()
    expect(responseBody.challengeCode).toBe(challengeCode)
    expect(responseBody.challengeResponse).toBeDefined()

    // Verify challengeResponse is proper HMAC-SHA256 hex format (64 characters)
    expect(responseBody.challengeResponse).toMatch(/^[0-9a-f]{64}$/)

    // Verify challengeResponse matches expected HMAC computation with default test client secret
    const expectedChallengeResponse = createHmac('sha256', 'client_secret')
      .update(challengeCode)
      .digest('hex')
    expect(responseBody.challengeResponse).toBe(expectedChallengeResponse)
  })

  test('should compute challengeResponse correctly with known test vectors', async ({
    startExampleApp,
  }) => {
    // GIVEN: LinkedIn automation with known client secret and specific challenge codes
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })
    await connectTo('linkedin-ads', page)

    // Test vectors with known challengeCode and expected HMAC-SHA256 results
    const testVectors = [
      {
        challengeCode: 'test123',
        clientSecret: 'client_secret',
        expectedResponse: createHmac('sha256', 'client_secret').update('test123').digest('hex'),
      },
      {
        challengeCode: 'linkedin_webhook_validation_2024',
        clientSecret: 'client_secret',
        expectedResponse: createHmac('sha256', 'client_secret')
          .update('linkedin_webhook_validation_2024')
          .digest('hex'),
      },
    ]

    // WHEN: Testing each vector
    for (const vector of testVectors) {
      const webhookUrl = `${url}/api/automations/1?challengeCode=${vector.challengeCode}`
      const validationResponse = await page.request.get(webhookUrl)

      // THEN: Should compute exact expected HMAC for each test vector
      expect(validationResponse.status()).toBe(200)
      const responseBody = await validationResponse.json()
      expect(responseBody.challengeCode).toBe(vector.challengeCode)
      expect(responseBody.challengeResponse).toBe(vector.expectedResponse)
    }
  })

  test('should process actual lead form data when POST request sent', async ({
    startExampleApp,
  }) => {
    // GIVEN
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })
    await connectTo('linkedin-ads', page)

    // WHEN - LinkedIn sends POST with actual lead form data
    const webhookUrl = `${url}/api/automations/1`
    const leadFormData = {
      leadType: 'SPONSORED',
      formResponse: {
        id: 'urn:li:leadFormResponse:123456',
        formId: 'urn:li:leadForm:789',
        submittedAt: new Date().toISOString(),
        answers: [
          {
            questionId: 'q1',
            answer: 'John Doe',
          },
          {
            questionId: 'q2',
            answer: 'john.doe@example.com',
          },
        ],
      },
    }

    const dataResponse = await page.request.post(webhookUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: leadFormData,
    })

    // THEN - Should process the lead form data normally
    expect(dataResponse.ok()).toBeTruthy()
    expect(dataResponse.status()).toBe(200)
    const responseBody = await dataResponse.json()
    expect(responseBody.success).toBe(true)
    expect(responseBody.runId).toBeDefined()

    // Verify the run was created with the lead form data
    const runsResponse = await page.request.get('/api/runs')
    const { runs }: { runs: RunDto[] } = await runsResponse.json()
    const latestRun = runs.find((r) => r.id === responseBody.runId)
    expect(latestRun).toBeDefined()
    expect(latestRun?.status).toBe('success')
  })

  test('should handle GET validation for HTTP trigger path with correct HMAC computation', async ({
    startExampleApp,
  }) => {
    // GIVEN: HTTP automation configured for LinkedIn webhook validation
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })
    await connectTo('linkedin-ads', page)

    // WHEN: LinkedIn sends GET validation challenge to HTTP trigger endpoint
    const challengeCode = 'http-challenge-xyz789'
    const applicationId = 'client_id' // Match the LinkedIn connection's clientId
    const webhookUrl = `${url}/api/automations/post?challengeCode=${challengeCode}&applicationId=${applicationId}`

    const validationResponse = await page.request.get(webhookUrl)

    // THEN: Should respond with correctly computed challengeResponse for HTTP endpoint
    expect(validationResponse.ok()).toBeTruthy()
    expect(validationResponse.status()).toBe(200)
    expect(validationResponse.headers()['content-type']).toContain('application/json')

    const responseBody = await validationResponse.json()
    expect(responseBody.challengeCode).toBe(challengeCode)
    expect(responseBody.challengeResponse).toBeDefined()
    expect(responseBody.challengeResponse).toMatch(/^[0-9a-f]{64}$/)
  })
})
