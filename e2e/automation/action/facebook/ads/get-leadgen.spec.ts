import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

test('should run a facebook get leadgen action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('facebook', page)
  await page.request.get('/api/automations/get-leadgen')

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs } = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automationName).toBe('get-leadgen')
  expect(runs[0]?.status).toBe('success')

  // Verify the leadgen data structure
  const leadgenResponse = await page.request.get(`/api/runs/${runs[0]!.id}`)
  const { steps } = await leadgenResponse.json()
  expect(steps).toBeDefined()
  expect(steps[1]!.output.id).toBe('444444444444')
  expect(steps[1]!.output.ad_id).toBe('444444444')
  expect(steps[1]!.output.form_id).toBe('444444444444')
  expect(steps[1]!.output.page_id).toBe('444444444444')
  expect(steps[1]!.output.adgroup_id).toBe('44444444444')
  expect(steps[1]!.output.campaign_id).toBe('555555555')
  expect(steps[1]!.output.is_organic).toBe(false)
  expect(steps[1]!.output.platform).toBe('facebook')

  // Verify field data structure
  expect(steps[1]!.output.field_data).toBeDefined()
  expect(steps[1]!.output.field_data).toHaveLength(5)

  // Verify specific field data
  const fieldData = steps[1]!.output.field_data
  expect(fieldData.find((f: { name: string }) => f.name === 'email')?.values[0]).toBe(
    'john.doe@example.com'
  )
  expect(fieldData.find((f: { name: string }) => f.name === 'first_name')?.values[0]).toBe('John')
  expect(fieldData.find((f: { name: string }) => f.name === 'last_name')?.values[0]).toBe('Doe')
  expect(fieldData.find((f: { name: string }) => f.name === 'company')?.values[0]).toBe(
    'Example Corp'
  )
  expect(fieldData.find((f: { name: string }) => f.name === 'phone_number')?.values[0]).toBe(
    '+1234567890'
  )
})
