import { expect, test } from '@/e2e/fixtures'

test('should display the API path', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'http/post/request-body', test })

  // WHEN
  await page.goto('/openapi/scalar')

  // THEN
  await expect(page.getByRole('link', { name: '/automation/post HTTP Method' })).toBeVisible()
})

test('should display the API description', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'http/post/request-body', test })

  // WHEN
  await page.goto('/openapi/scalar')

  // THEN
  await expect(page.getByText('Run the automation "post" from a POST request')).toBeVisible()
})

test('should display the API request body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'http/post/request-body', test })

  // WHEN
  await page.goto('/openapi/scalar')

  // THEN
  await expect(
    page.getByRole('listitem').filter({ hasText: 'nameType:string required' })
  ).toBeVisible()
})

test('should display the API 200 response', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'http/post/request-body', test })

  // WHEN
  await page.goto('/openapi/scalar')

  // THEN
  await expect(
    page.getByRole('button', { name: '200 The automation successfully run' })
  ).toBeVisible()
})

test('should display the API 200 response body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'http/post/request-body', test })

  // WHEN
  await page.goto('/openapi/scalar')

  // THEN
  await expect(page.getByText('{ "message": "string" }')).toBeVisible()
})

test('should display the API 400 response', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'http/post/request-body', test })

  // WHEN
  await page.goto('/openapi/scalar')

  // THEN
  await expect(page.getByRole('button', { name: '400 The automation failed to run' })).toBeVisible()
})
