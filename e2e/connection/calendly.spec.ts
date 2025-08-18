import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

test('should connect to calendly', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'user@example.com', exact: true })).toBeVisible()
})
