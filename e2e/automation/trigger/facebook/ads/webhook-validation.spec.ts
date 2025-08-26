import { expect, test } from '@/e2e/fixtures'
import type { RunDto } from '../../../../../src/features/run/application/dto/run.dto'

test.describe('Facebook webhook validation', () => {
  test('should respond with hub.challenge when Facebook sends GET validation request', async ({
    startExampleApp,
  }) => {
    // GIVEN
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })

    // WHEN - Facebook sends GET validation request
    const hubChallenge = '1158201444'
    const hubVerifyToken = 'meatyhamhock'
    const webhookUrl = `${url}/api/automations/1?hub.mode=subscribe&hub.challenge=${hubChallenge}&hub.verify_token=${hubVerifyToken}`

    const validationResponse = await page.request.get(webhookUrl)

    // THEN - Should respond with the challenge value
    expect(validationResponse.ok()).toBeTruthy()
    expect(validationResponse.status()).toBe(200)
    // Note: The actual response format may need adjustment based on how the HTTP layer handles __rawResponse
    const responseBody = await validationResponse.json()
    expect(responseBody.__rawResponse || responseBody).toBe(hubChallenge)

    // Verify the content-type is text/plain
    const contentType = validationResponse.headers()['content-type']
    expect(contentType).toContain('text/plain')
  })

  test('should not respond with challenge when hub.mode is not subscribe', async ({
    startExampleApp,
  }) => {
    // GIVEN
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })

    // WHEN - Facebook sends request with wrong hub.mode
    const hubChallenge = '1158201444'
    const hubVerifyToken = 'meatyhamhock'
    const webhookUrl = `${url}/api/automations/1?hub.mode=unsubscribe&hub.challenge=${hubChallenge}&hub.verify_token=${hubVerifyToken}`

    const validationResponse = await page.request.get(webhookUrl)

    // THEN - Should process as normal GET request, not validation
    expect(validationResponse.ok()).toBeTruthy()
    const responseBody = await validationResponse.json()
    expect(responseBody.success).toBe(true)
    expect(responseBody).not.toBe(hubChallenge)
  })

  test('should process actual lead data when POST request sent', async ({ startExampleApp }) => {
    // GIVEN
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })

    // WHEN - Facebook sends POST with actual lead data
    const webhookUrl = `${url}/api/automations/1`
    const leadData = {
      entry: [
        {
          id: '123456789',
          time: Date.now(),
          changes: [
            {
              field: 'leadgen',
              value: {
                ad_id: '987654321',
                form_id: '112233445566',
                leadgen_id: '998877665544',
                created_time: Date.now(),
                page_id: '111222333444',
                adgroup_id: '555666777888',
              },
            },
          ],
        },
      ],
    }

    const dataResponse = await page.request.post(webhookUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: leadData,
    })

    // THEN - Should process the lead data normally
    expect(dataResponse.ok()).toBeTruthy()
    expect(dataResponse.status()).toBe(200)
    const responseBody = await dataResponse.json()
    expect(responseBody.success).toBe(true)
    expect(responseBody.runId).toBeDefined()

    // Verify the run was created with the lead data
    const runsResponse = await page.request.get('/api/runs')
    const { runs }: { runs: RunDto[] } = await runsResponse.json()
    const latestRun = runs.find((r) => r.id === responseBody.runId)
    expect(latestRun).toBeDefined()
    expect(latestRun?.status).toBe('success')
  })

  test('should handle validation for HTTP trigger path as well', async ({ startExampleApp }) => {
    // GIVEN - Use an HTTP POST example
    const { page, url } = await startExampleApp({
      test,
      loggedOnAdmin: true,
    })

    // WHEN - Facebook sends GET validation to HTTP trigger
    const hubChallenge = 'test-challenge-123'
    const hubVerifyToken = 'test-token'
    const webhookUrl = `${url}/api/automations/post?hub.mode=subscribe&hub.challenge=${hubChallenge}&hub.verify_token=${hubVerifyToken}`

    const validationResponse = await page.request.get(webhookUrl)

    // THEN - Should respond with the hub.challenge
    expect(validationResponse.ok()).toBeTruthy()
    expect(validationResponse.status()).toBe(200)
    const responseBody = await validationResponse.json()
    expect(responseBody.__rawResponse || responseBody).toBe(hubChallenge)
  })
})
