import type { AutomationDto } from '../../src/features/automation/application/dto/automation.dto'
import { expect, test } from '../fixtures'

test('should return a list of automations', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/http/post' })

  // WHEN
  const response = await page.request.get('/api/automations')

  // THEN
  expect(response.status()).toBe(200)
  const { automations }: { automations: AutomationDto[] } = await response.json()
  expect(automations.length).toBe(1)
  expect(automations[0]?.name).toBe('post')
  expect(automations[0]?.updatedAt).toBeDefined()
  expect(automations[0]?.active).toBe(true)
})
