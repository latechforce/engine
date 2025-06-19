import { expect, test } from '@/e2e/fixtures'
import type { GetAppMetadataDto } from '../../src/features/app/application/dto/get-app-metadata.dto'
import type { GetAdminMetadataDto } from '../../src/features/app/application/dto/get-admin-metadata.dto'

test('should return 200 OK on health check', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.get('/api/health')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})

test('should return app metadata', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'metadata' })

  // WHEN
  const response = await page.request.get('/api/metadata/app')

  // THEN
  expect(response.status()).toBe(200)
  const { app }: GetAppMetadataDto = await response.json()
  expect(app.name).toBe('App with metadata')
  expect(app.version).toBe('1.0.0')
  expect(app.description).toBe('My App Description')
})

test('should return admin metadata', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'metadata' })

  // WHEN
  const response = await page.request.get('/api/metadata/admin')

  // THEN
  expect(response.status()).toBe(200)
  const { admin }: GetAdminMetadataDto = await response.json()
  expect(admin.name).toBe('App with metadata')
  expect(admin.version).toBe('1.0.0')
})
