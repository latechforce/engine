import { expect, test } from '@/e2e/fixtures'
import type { GetRunDto } from '../../../src/features/run/application/dto/get-run.dto'
import type { ListRunsDto } from '../../../src/features/run/application/dto/list-runs.dto'

test('should display a form with a single line text input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/forms/contact-us')

  // THEN
  await expect(page.getByLabel('Name')).toBeVisible()
})

test('should run an automation when a form with a single line text input is submitted', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'post-automation' })

  // WHEN
  await page.goto('/forms/contact-us')
  await page.getByLabel('Name').fill('John Doe')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.waitForSelector('text="Thank you for your submission"')

  // THEN
  const { runs }: ListRunsDto = await page.request.get('/api/runs').then((res) => res.json())
  expect(runs.length).toBe(1)
  const { steps }: GetRunDto = await page.request
    .get(`/api/runs/${runs[0]!.id}`)
    .then((res) => res.json())
  expect(steps[0]!.output.body).toEqual({ name: 'John Doe' })
})

test('should create a record with a single line text input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/forms/contact-us')
  await page.getByLabel('Name').fill('John Doe')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.waitForSelector('text="Thank you for your submission"')

  // THEN
  const { records } = await page.request.get('/api/tables/1').then((res) => res.json())
  expect(records.length).toBe(1)
  expect(records[0].fields.name).toBe('John Doe')
})
