import { expect, test } from '@/e2e/fixtures'
import { connectToCalendly } from '@/e2e/steps'

test('should connect to calendly', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectToCalendly(page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
})
