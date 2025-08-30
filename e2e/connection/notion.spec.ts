import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

test.fixme('should connect to notion', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('notion', page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
})
