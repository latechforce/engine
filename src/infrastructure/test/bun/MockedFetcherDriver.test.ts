import { describe, expect, it } from 'bun:test'
import { MockedFetcherDriver } from './MockedFetcherDriver'

describe('get', () => {
  it('should add and retrieve a GET endpoint', async () => {
    const fetcher = new MockedFetcherDriver()

    fetcher.mock('GET', 'https://example.com/api/test', async () => {
      return new Response('Test Response', { status: 200 })
    })

    const response = await fetcher.get('https://example.com/api/test', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
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

describe('post', () => {
  it('should add and retrieve a POST endpoint', async () => {
    const fetcher = new MockedFetcherDriver()

    fetcher.mock('POST', 'https://example.com/api/post', async (request) => {
      const requestBody = await request.json()
      return new Response(JSON.stringify({ received: requestBody }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    })

    const postData = { message: 'Hello' }
    const response = await fetcher.post('https://example.com/api/post', postData)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data).toEqual({ received: postData })
  })

  it('should throw an error when no matching POST endpoint is found', async () => {
    const fetcher = new MockedFetcherDriver()

    try {
      await fetcher.post(
        'https://example.com/api/unknown',
        { test: 'data' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      if (error instanceof Error)
        expect(error.message).toBe(
          'No matching endpoint found for URL: https://example.com/api/unknown'
        )
    }
  })
})

describe('mock', () => {
  it('should execute an endpoint that starts with the given URL', async () => {
    const fetcher = new MockedFetcherDriver()

    fetcher.mock('GET', 'https://example.com/api/resource', async () => {
      return new Response('Resource Found', { status: 200 })
    })

    const response = await fetcher.get('https://example.com/api/resource/123')
    const text = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe('Resource Found')
  })
})
