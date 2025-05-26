import type { AutomationDto } from '@/application/dto/automation.dto'
import { expect, test } from '@/e2e/fixtures'

test('should return a list of automations', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/service/http/post' })

  // WHEN
  const response = await page.request.get('/api/automations')

  // THEN
  expect(response.status()).toBe(200)
  const automations: AutomationDto[] = await response.json()
  expect(automations.length).toBe(1)
  expect(automations[0]?.name).toBe('post')
})
