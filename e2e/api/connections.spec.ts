import type { ConnectionDto } from '@/application/dto/connection/connection.dto'
import { expect, test } from '@/e2e/fixtures'

test('should return a list of connections', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'connection/calendly' })

  // WHEN
  const response = await page.request.get('/api/connections')

  // THEN
  expect(response.status()).toBe(200)
  const { connections }: { connections: ConnectionDto[] } = await response.json()
  expect(connections.length).toBe(1)
  expect(connections[0]?.name).toBe('Calendly')
  expect(connections[0]?.service).toBe('calendly')
  expect(connections[0]?.authType).toBe('oauth')
})
