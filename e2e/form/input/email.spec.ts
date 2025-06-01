import { expect, test } from '@/e2e/fixtures'

test('should display a form with an email input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/forms/contact-us')

  // THEN
  await expect(page.getByLabel('Email')).toBeVisible()
})

test('should run an automation when a form with a email input is submitted', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'post-automation' })

  // WHEN
  await page.goto('/forms/contact-us')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.waitForSelector('text="Thank you for your submission"')

  // THEN
  const { runs } = await page.request.get('/api/runs').then((res) => res.json())
  expect(runs.length).toBe(1)
  const { data } = await page.request.get(`/api/runs/${runs[0].id}`).then((res) => res.json())
  expect(data.trigger?.body?.email).toBe('test@example.com')
})

test('should create a record with a email input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/forms/contact-us')
  await page.getByLabel('Email').fill('test@example.com')
  await page.getByRole('button', { name: 'Submit' }).click()
  await page.waitForSelector('text="Thank you for your submission"')

  // THEN
  const { records } = await page.request.get('/api/tables/1').then((res) => res.json())
  expect(records.length).toBe(1)
  expect(records[0].fields.email).toBe('test@example.com')
})
