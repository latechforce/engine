import { test, expect } from './fixtures'

test(`should login`, async ({ startExampleApp }) => {
  // WHEN
  const page = await startExampleApp({ loggedOnAdmin: true })

  // THEN
  await expect(page.waitForURL('/_admin')).resolves.toBeUndefined()
})
