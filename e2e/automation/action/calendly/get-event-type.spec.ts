import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { getEventTypeResponse, webhookPayloadInviteCreated } from '@/e2e/__mocks__/calendly'
import type { GetEventTypeResponse } from '../../../../src/shared/integrations/productivity/calendly/calendly.types'
import type { RunDto } from '../../../../src/features/run/application/dto/run.dto'

test('should run a calendly get event type action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  const response = await page.request.post('/api/automations/1')

  // THEN
  const { data }: { data: GetEventTypeResponse } = await response.json()
  expect(data).toStrictEqual(getEventTypeResponse)
})

test('should run a calendly get event type action on invite created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'on-invite-created' })

  // WHEN
  await connectTo('calendly', page)
  await page.request.post('/api/automations/1', {
    data: webhookPayloadInviteCreated,
  })

  // THEN
  let run: RunDto | undefined
  let i = 0
  do {
    if (i === 0) await new Promise((resolve) => setTimeout(resolve, 1000))
    const { runs }: { runs: RunDto[] } = await page.request
      .get('/api/runs')
      .then((res) => res.json())
    run = runs[0]
    i++
  } while ((!run || run.status === 'playing') && i < 10)
  expect(run?.status).toBe('success')
})
