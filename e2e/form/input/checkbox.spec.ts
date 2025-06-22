import { expect, test } from '@/e2e/fixtures'
import type { GetRunDto } from '../../../src/features/run/application/dto/get-run.dto'
import type { ListRunsDto } from '../../../src/features/run/application/dto/list-runs.dto'

test('should display a form with a checkbox input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/forms/contact-us')

  // THEN
  await expect(page.getByLabel('I agree to the terms and conditions')).toBeVisible()
})

test('should run an automation when a form with a checkbox input is submitted', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'post-automation', loggedOnAdmin: true })

  // WHEN
  await page.goto('/forms/contact-us')
  await page.getByLabel('I agree to the terms and conditions').check()
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.waitForSelector('text="Thank you for your submission"')

  // THEN
  const { runs }: ListRunsDto = await page.request.get('/api/runs').then((res) => res.json())
  expect(runs.length).toBe(1)
  const { steps }: GetRunDto = await page.request
    .get(`/api/runs/${runs[0]!.id}`)
    .then((res) => res.json())
  expect(steps[0]!.output.body).toEqual({ checkbox: true })
})

test('should create a record with a checkbox input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await page.goto('/forms/contact-us')
  await page.getByLabel('I agree to the terms and conditions').check()
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.waitForSelector('text="Thank you for your submission"')

  // THEN
  const { records } = await page.request.get('/api/tables/1').then((res) => res.json())
  expect(records.length).toBe(1)
  expect(records[0].fields.checkbox).toBe(true)
})
