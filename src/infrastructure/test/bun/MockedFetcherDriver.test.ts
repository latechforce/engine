import { describe, expect, it } from 'bun:test'
import { MockedFetcherDriver } from './MockedFetcherDriver'

describe('get', () => {
  it('should add and retrieve a GET endpoint', async () => {
    const fetcher = new MockedFetcherDriver()

    fetcher.addEndpoint('GET', 'https://example.com/api/test', () => {
      return new Response('Test Response', { status: 200 })
    })

    const response = await fetcher.get('https://example.com/api/test')
    const text = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe('Test Response')
  })

  it('should throw an error when no matching endpoint is found', async () => {
    const fetcher = new MockedFetcherDriver()

    try {
      await fetcher.get('https://example.com/api/unknown')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      if (error instanceof Error)
        expect(error.message).toBe(
          'No matching endpoint found for URL: https://example.com/api/unknown'
        )
    }
  })
})

describe('addEndpoint', () => {
  it('should execute an endpoint that starts with the given URL', async () => {
    const fetcher = new MockedFetcherDriver()

    fetcher.addEndpoint('GET', 'https://example.com/api/resource/123', () => {
      return new Response('Resource Found', { status: 200 })
    })

    const response = await fetcher.get('https://example.com/api/resource')
    const text = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe('Resource Found')
  })
})
