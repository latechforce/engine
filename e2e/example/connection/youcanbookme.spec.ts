import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

// TODO: [@kermitsxb] - should connect to YouCanBookMe
test('should connect to YouCanBookMe', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('youcanbookme', page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
})
