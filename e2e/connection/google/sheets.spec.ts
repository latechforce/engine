import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

// TODO: [@thomas-jeanneau] - should connect to Google Sheets
test.skip('should connect to Google Sheets', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('google', page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
})
