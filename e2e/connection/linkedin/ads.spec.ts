import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

// TODO: [@kermitsxb] - should connect to LinkedIn Ads
test.skip('should connect to LinkedIn Ads', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('linkedin', page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
})
