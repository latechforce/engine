import type { ListRunsDto } from '../../src/features/run/application/dto/list-runs.dto'
import type { AutomationDto } from '../../src/features/automation/application/dto/automation.dto'
import { expect, test } from '../fixtures'
import { connectTo } from '../steps'
import type { Step } from '../../src/features/run/domain/value-object.ts/step.value-object'
import { differenceInSeconds } from 'date-fns'

test('should return a list of automations', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/http/post', loggedOnAdmin: true })

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

test('should run parallel automations with same integration actions in a queue with 2 seconds apart', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'parallel-actions',
    loggedOnAdmin: true,
  })

  // WHEN
  await connectTo('google', page)
  await page.request.post('/api/automations/run-typescript')

  // THEN
  const { runs }: ListRunsDto = await page.request.get('/api/runs').then((res) => res.json())
  expect(runs.length).toBe(3)
  const createdAtIntegrationActions = runs.map(
    (run) =>
      JSON.parse(run.steps).find(
        (step: Step) =>
          step.schema.service === 'google-sheets' && step.schema.action === 'append-values'
      )?.finishedAt
  )
  const diff1 = Math.abs(
    differenceInSeconds(createdAtIntegrationActions[0]!, createdAtIntegrationActions[1]!)
  )
  expect(diff1).toBeGreaterThanOrEqual(2)
  const diff2 = Math.abs(
    differenceInSeconds(createdAtIntegrationActions[0]!, createdAtIntegrationActions[2]!)
  )
  expect(diff2).toBeGreaterThanOrEqual(2)
  const diff3 = Math.abs(
    differenceInSeconds(createdAtIntegrationActions[1]!, createdAtIntegrationActions[2]!)
  )
  expect(diff3).toBeGreaterThanOrEqual(2)
})
