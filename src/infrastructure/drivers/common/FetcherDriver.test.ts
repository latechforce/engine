import { describe, it, expect, mock } from 'bun:test'
import { FetcherDriver } from './FetcherDriver'

const fetcher = new FetcherDriver()

describe('get', () => {
  it('should make a GET request and return a response', async () => {
    globalThis.fetch = mock(async () => {
      return new Response(JSON.stringify({ success: true }), { status: 200 })
    })

    const response = await fetcher.get('https://example.com')
    const data = await response.json()

    expect(globalThis.fetch).toHaveBeenCalledWith('https://example.com')
    expect(response.status).toBe(200)
    expect(data).toEqual({ success: true })
  })
})

describe('post', () => {
  it('should make a POST request with correct headers and body', async () => {
    globalThis.fetch = mock(async () => {
      return new Response(JSON.stringify({ success: true }), { status: 201 })
    })

    const requestBody = { name: 'Test' }
    const response = await fetcher.post('https://example.com', requestBody)
    const data = await response.json()

    expect(globalThis.fetch).toHaveBeenCalledWith('https://example.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
    expect(response.status).toBe(201)
    expect(data).toEqual({ success: true })
  })
})
