import { describe, it, expect } from 'bun:test'
import { FetcherDriver } from './FetcherDriver'

const fetcher = new FetcherDriver()

describe('get', () => {
  it('should make a GET request and return a response', async () => {
    const response = await fetcher.get('https://example.com')
    const data = await response.text()

    expect(response.status).toBe(200)
    expect(data).toContain('This domain is for use in illustrative examples in documents.')
  })
})

describe('post', () => {
  it('should make a POST request with correct headers and body', async () => {
    const requestBody = { name: 'Test' }
    const response = await fetcher.post('https://example.com', requestBody)
    const data = await response.text()

    expect(response.status).toBe(403)
    expect(data).toContain('Access Denied')
  })
})
