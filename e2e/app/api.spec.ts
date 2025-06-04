import { expect, test } from '@/e2e/fixtures'
import type { GetAppMetadataDto } from 'src/features/app/application/dto/get-app-metadata.dto'

test('should return 200 OK', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'health' })

  // WHEN
  const response = await page.request.get('/api/health')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})

test('should return metadata', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'metadata' })

  // WHEN
  const response = await page.request.get('/api/metadata')

  // THEN
  expect(response.status()).toBe(200)
  const { app }: GetAppMetadataDto = await response.json()
  expect(app.name).toBe('App with metadata')
  expect(app.version).toBe('1.0.0')
  expect(app.description).toBe('My App Description')
})
