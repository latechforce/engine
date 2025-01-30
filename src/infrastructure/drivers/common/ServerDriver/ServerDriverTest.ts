import type BunTester from 'bun:test'
import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import { JsonResponse } from '/domain/entities/Response/Json'

export function testServerDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  driver: IServerDriver
) {
  let port: number

  beforeAll(async () => {
    driver.get('/test-get', async () => new JsonResponse({ message: 'GET success' }))
    driver.post('/test-post', async () => new JsonResponse({ message: 'POST success' }, 201))
    driver.patch('/test-patch', async () => new JsonResponse({ message: 'PATCH success' }))
    driver.delete('/test-delete', async () => new JsonResponse({}, 204))
    driver.notFound(async () => new JsonResponse({ message: 'Not found' }, 404))

    port = await driver.start()
  })

  afterAll(async () => {
    await driver.stop()
  })

  describe('get', () => {
    it('should respond to GET requests', async () => {
      const res = await fetch(`http://localhost:${port}/test-get`)
      const data = await res.json()
      expect(res.status).toBe(200)
      expect(data.message).toBe('GET success')
    })

    it('should return 404 for unknown routes', async () => {
      const res = await fetch(`http://localhost:${port}/unknown-route`)
      const data = await res.json()
      expect(res.status).toBe(404)
      expect(data.message).toBe('Not found')
    })
  })

  describe('post', () => {
    it('should respond to POST requests', async () => {
      const res = await fetch(`http://localhost:${port}/test-post`, { method: 'POST' })
      const data = await res.json()
      expect(res.status).toBe(201)
      expect(data.message).toBe('POST success')
    })
  })

  describe('patch', () => {
    it('should respond to PATCH requests', async () => {
      const res = await fetch(`http://localhost:${port}/test-patch`, { method: 'PATCH' })
      const data = await res.json()
      expect(res.status).toBe(200)
      expect(data.message).toBe('PATCH success')
    })
  })

  describe('delete', () => {
    it('should respond to DELETE requests', async () => {
      const res = await fetch(`http://localhost:${port}/test-delete`, { method: 'DELETE' })
      expect(res.status).toBe(204)
    })
  })
}
