import type { ConnectionDto } from '../../src/features/connection/application/dto/connection.dto'
import { expect, test } from '../fixtures'

test('should return a list of connections', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'connection/calendly',
    loggedOnAdmin: true,
  })

  // WHEN
  const response = await page.request.get('/api/connections')

  // THEN
  expect(response.status()).toBe(200)
  const { connections }: { connections: ConnectionDto[] } = await response.json()
  expect(connections.length).toBe(1)
  expect(connections[0]?.name).toBe('Calendly')
  expect(connections[0]?.service).toBe('calendly')
})
