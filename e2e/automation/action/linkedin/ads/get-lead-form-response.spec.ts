import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

test('should run a linkedin get lead form response action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('linkedin', page)
  await page.request.get('/api/automations/get-lead-response')

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs } = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automationName).toBe('get-lead-response')
  expect(runs[0]?.status).toBe('success')

  // Verify the lead form response data structure
  const leadResponse = await page.request.get(`/api/runs/${runs[0]!.id}`)
  const { steps } = await leadResponse.json()
  expect(steps).toBeDefined()
  expect(steps[1]!.output.leadType).toBe('SPONSORED')
  expect(steps[1]!.output.owner?.organization).toBe('urn:li:organization:5622087')
  expect(steps[1]!.output.submitter?.person).toBe('urn:li:person:abc123')

  // Verify form response structure
  expect(steps[1]!.output.formResponse).toBeDefined()
  expect(steps[1]!.output.formResponse.id).toBe('urn:li:leadFormResponse:123456')
  expect(steps[1]!.output.formResponse.formId).toBe('urn:li:leadForm:789')
  expect(steps[1]!.output.formResponse.submittedAt).toBe(1609459200000)
  expect(steps[1]!.output.formResponse.answers).toHaveLength(4)

  // Verify specific form answers
  const answers = steps[1]!.output.formResponse.answers
  expect(answers.find((a: { questionId: string }) => a.questionId === 'firstName')?.answer).toBe(
    'John'
  )
  expect(answers.find((a: { questionId: string }) => a.questionId === 'lastName')?.answer).toBe(
    'Doe'
  )
  expect(answers.find((a: { questionId: string }) => a.questionId === 'email')?.answer).toBe(
    'john.doe@example.com'
  )
  expect(answers.find((a: { questionId: string }) => a.questionId === 'company')?.answer).toBe(
    'Example Corp'
  )
})
