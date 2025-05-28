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
