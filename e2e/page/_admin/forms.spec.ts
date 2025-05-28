import { expect, test } from '@/e2e/fixtures'

test('should list forms', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'form/input/single-line',
    loggedOnAdmin: true,
  })

  // WHEN
  await page.goto('/_admin/forms')

  // THEN
  await expect(page.getByText('Contact Us')).toBeVisible()
})

test('should open a form in a new page', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'form/input/single-line',
    loggedOnAdmin: true,
  })

  // WHEN
  await page.goto('/_admin/forms')
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('button', { name: 'Open', exact: true }).click(),
  ])
  await newPage.waitForLoadState()

  // THEN
  expect(newPage.url()).toContain('/form/contact-us')
})
