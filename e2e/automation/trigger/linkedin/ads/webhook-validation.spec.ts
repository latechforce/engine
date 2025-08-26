import { expect, test } from '@/e2e/fixtures'
import type { RunDto } from '../../../../../src/features/run/application/dto/run.dto'

test.describe('LinkedIn webhook validation', () => {
  test('should respond with challengeCode when LinkedIn sends GET validation request', async ({
    startExampleApp,
  }) => {
    // GIVEN
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })

    // WHEN - LinkedIn sends GET validation challenge
    const challengeCode = 'test-challenge-abc123'
    const webhookUrl = `${url}/api/automations/1?challengeCode=${challengeCode}`

    const validationResponse = await page.request.get(webhookUrl)

    // THEN - Should respond with the challengeCode and challengeResponse
    expect(validationResponse.ok()).toBeTruthy()
    expect(validationResponse.status()).toBe(200)
    const responseBody = await validationResponse.json()
    expect(responseBody.challengeCode).toBe(challengeCode)
    expect(responseBody.challengeResponse).toBeDefined() // Should be HMAC-SHA256 of challengeCode
  })

  test('should process actual lead form data when POST request sent', async ({
    startExampleApp,
  }) => {
    // GIVEN
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })

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

  test('should handle GET validation for HTTP trigger path as well', async ({
    startExampleApp,
  }) => {
    // GIVEN - Use the HTTP POST example
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })

    // WHEN - LinkedIn sends GET validation challenge to HTTP trigger
    const challengeCode = 'http-challenge-xyz789'
    const webhookUrl = `${url}/api/automations/post?challengeCode=${challengeCode}`

    const validationResponse = await page.request.get(webhookUrl)

    // THEN - Should respond with the challengeCode and challengeResponse
    expect(validationResponse.ok()).toBeTruthy()
    expect(validationResponse.status()).toBe(200)
    const responseBody = await validationResponse.json()
    expect(responseBody.challengeCode).toBe(challengeCode)
    expect(responseBody.challengeResponse).toBeDefined()
  })
})
