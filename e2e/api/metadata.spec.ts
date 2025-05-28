import type { MetadataDto } from '@/application/dto/metadata.dto'
import { expect, test } from '@/e2e/fixtures'

test('should return metadata', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'metadata' })

  // WHEN
  const response = await page.request.get('/api/metadata')

  // THEN
  expect(response.status()).toBe(200)
  const { metadata }: { metadata: MetadataDto } = await response.json()
  expect(metadata.name).toBe('App with metadata')
  expect(metadata.version).toBe('1.0.0')
  expect(metadata.description).toBe('My App Description')
})
