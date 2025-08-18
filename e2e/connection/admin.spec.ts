import { expect, test } from '../fixtures'
import { connectTo } from '../steps'

test('should connect a connection', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'connection/calendly',
    loggedOnAdmin: true,
  })

  // WHEN
  await connectTo('calendly', page)

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'user@example.com', exact: true })).toBeVisible()
})

test('should disconnect a connection', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'connection/calendly',
    loggedOnAdmin: true,
  })

  // WHEN
  await connectTo('calendly', page)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('menuitem', { name: 'Disconnect account' }).click()

  // THEN
  await expect(page.getByRole('cell', { name: 'Disconnected', exact: true })).toBeVisible()
})

test('should copy shareable connection link', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'connection/calendly',
    loggedOnAdmin: true,
  })

  // WHEN
  await connectTo('calendly', page)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('menuitem', { name: 'Copy shareable connection link' }).click()

  // THEN
  await expect(page.getByText('Shareable connection link copied to clipboard')).toBeVisible()
})
