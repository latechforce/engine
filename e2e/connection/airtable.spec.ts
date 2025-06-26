import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

test('should connect to airtable', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('airtable', page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
})
