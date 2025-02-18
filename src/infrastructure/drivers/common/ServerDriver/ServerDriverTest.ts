import type BunTester from 'bun:test'
import type { IServerDriver } from '/adapter/spi/drivers/ServerSpi'
import { JsonResponse } from '/domain/entities/Response/Json'
import puppeteer, { Browser, Page } from 'puppeteer'

export function testServerDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  driver: IServerDriver
) {
  let port: number
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    driver.get('/test-get', async () => new JsonResponse({ message: 'GET success' }), {})
    driver.get('/test-auth-get', async () => new JsonResponse({ message: 'GET success' }), {
      auth: 'ApiKey',
    })
    driver.post('/test-post', async () => new JsonResponse({ message: 'POST success' }, 201), {
      body: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
        required: ['message'],
      },
      response: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
        required: ['message'],
      },
      detail: {
        summary: 'Detail Test POST',
        description: 'Detail Test Description',
        tags: ['Automation'],
      },
    })
    driver.post('/test-auth-post', async () => new JsonResponse({ message: 'POST success' }, 201), {
      auth: 'ApiKey',
    })
    driver.patch('/test-patch', async () => new JsonResponse({ message: 'PATCH success' }), {})
    driver.patch('/test-auth-patch', async () => new JsonResponse({ message: 'PATCH success' }), {
      auth: 'ApiKey',
    })
    driver.delete('/test-delete', async () => new JsonResponse({}, 204), {})
    driver.delete('/test-auth-delete', async () => new JsonResponse({}, 204), {
      auth: 'ApiKey',
    })
    driver.notFound(async () => new JsonResponse({ message: 'Not found' }, 404))

    port = await driver.start()
    browser = await puppeteer.launch({
      args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
    })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await driver.stop()
    await browser.close()
  })

  describe('get', () => {
    it('should respond to GET requests', async () => {
      const res = await fetch(`http://localhost:${port}/test-get`)
      const data = await res.json()
      expect(res.status).toBe(200)
      expect(data.message).toBe('GET success')
    })

    it('should failed to GET requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-get`)
      const data = await res.json()
      expect(res.status).toBe(401)
      expect(data.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should failed to GET requests with ApiKey authentification and wrong key', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-get`, {
        headers: { 'x-api-key': 'invalid-key' },
      })
      const data = await res.json()
      expect(res.status).toBe(401)
      expect(data.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should succeed to GET requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-get`, {
        headers: { 'x-api-key': 'test-key' },
      })
      const data = await res.json()
      expect(res.status).toBe(200)
      expect(data.message).toBe('GET success')
    })

    it('should succeed to GET requests with ApiKey authentification and camelcase header', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-get`, {
        headers: { 'X-Api-Key': 'test-key' },
      })
      const data = await res.json()
      expect(res.status).toBe(200)
      expect(data.message).toBe('GET success')
    })

    it('should succeed to GET requests with ApiKey authentification and uppercase header', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-get`, {
        headers: { 'X-API-KEY': 'test-key' },
      })
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

    it('should return a swagger OpenAPI', async () => {
      const res = await fetch(`http://localhost:${port}/api/docs`)
      expect(res.status).toBe(200)
    })

    it('should return a swagger OpenAPI with a custom title', async () => {
      const res = await fetch(`http://localhost:${port}/api/docs`)
      const data = await res.text()
      const title = data.match(/<title>(.*?)<\/title>/)
      expect(title?.[1]).toBe('Test Title - API Documentation')
    })

    it('should return a swagger OpenAPI with a custom version', async () => {
      await page.goto(`http://localhost:${port}/api/docs`)
      expect(
        await page.waitForFunction((text) => document.body.innerText.includes(text), {}, '1.0.0')
      ).toBeTruthy()
    })

    it('should return a swagger OpenAPI with a custom description', async () => {
      await page.goto(`http://localhost:${port}/api/docs`)
      expect(
        await page.waitForFunction(
          (text) => document.body.innerText.includes(text),
          {},
          'Test Description'
        )
      ).toBeTruthy()
    })

    it('should return a swagger OpenAPI json', async () => {
      const res = await fetch(`http://localhost:${port}/api/docs/json`)
      const data = await res.json()
      expect(res.status).toBe(200)
      expect(data.openapi).toBe('3.0.3')
      expect(data.paths).toHaveProperty('/test-get')
      expect(data.paths).toHaveProperty('/test-post')
      expect(data.paths).toHaveProperty('/test-patch')
      expect(data.paths).toHaveProperty('/test-delete')
    })
  })

  describe('post', () => {
    it('should respond to POST requests', async () => {
      const res = await fetch(`http://localhost:${port}/test-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello, World!',
        }),
      })
      const data = await res.json()
      expect(res.status).toBe(201)
      expect(data.message).toBe('POST success')
    })

    it('should failed to POST requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Hello, World!',
        }),
      })
      const data = await res.json()
      expect(res.status).toBe(401)
      expect(data.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should succeed to POST requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-post`, {
        method: 'POST',
        headers: { 'x-api-key': 'test-key', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Hello, World!',
        }),
      })
      const data = await res.json()
      expect(res.status).toBe(201)
      expect(data.message).toBe('POST success')
    })

    it('should return a swagger OpenAPI with a custom detail summary', async () => {
      await page.goto(`http://localhost:${port}/api/docs`)
      expect(
        await page.waitForFunction(
          (text) => document.body.innerText.includes(text),
          {},
          'Detail Test POST'
        )
      ).toBeTruthy()
    })

    it('should return a swagger OpenAPI with a custom detail description', async () => {
      await page.goto(`http://localhost:${port}/api/docs`)
      expect(
        await page.waitForFunction(
          (text) => document.body.innerText.includes(text),
          {},
          'Detail Test Description'
        )
      ).toBeTruthy()
    })

    it('should return a swagger OpenAPI with a custom detail tag', async () => {
      await page.goto(`http://localhost:${port}/api/docs`)
      expect(
        await page.waitForFunction(
          (text) => document.body.innerText.includes(text),
          {},
          'Automation'
        )
      ).toBeTruthy()
    })
  })

  describe('patch', () => {
    it('should respond to PATCH requests', async () => {
      const res = await fetch(`http://localhost:${port}/test-patch`, { method: 'PATCH' })
      const data = await res.json()
      expect(res.status).toBe(200)
      expect(data.message).toBe('PATCH success')
    })

    it('should failed to PATCH requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-patch`, { method: 'PATCH' })
      const data = await res.json()
      expect(res.status).toBe(401)
      expect(data.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should succeed to PATCH requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-patch`, {
        method: 'PATCH',
        headers: { 'x-api-key': 'test-key' },
      })
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

    it('should failed to DELETE requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-delete`, { method: 'DELETE' })
      const data = await res.json()
      expect(res.status).toBe(401)
      expect(data.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should succeed to DELETE requests with ApiKey authentification', async () => {
      const res = await fetch(`http://localhost:${port}/test-auth-delete`, {
        method: 'DELETE',
        headers: { 'x-api-key': 'test-key' },
      })
      expect(res.status).toBe(204)
    })
  })
}
