import { describe, it, expect } from 'bun:test'
import { FetcherDriver } from './FetcherDriver'

const fetcher = new FetcherDriver()

describe('get', () => {
  it('should make a GET request and return a response', async () => {
    const response = await fetcher.get('https://latechforce.com')
    const data = await response.text()

    expect(response.status).toBe(200)
    expect(data).toContain('notion')
  })
})

describe('post', () => {
  it('should make a POST request with correct headers and body', async () => {
    const requestBody = { name: 'Test' }
    const response = await fetcher.post('https://latechforce.com', requestBody)
    const data = await response.text()

    expect(response.status).toBe(200)
    expect(data).toContain('notion')
  })
})

describe('put', () => {
  it('should make a PUT request with correct headers and body', async () => {
    const requestBody = { name: 'Test' }
    const response = await fetcher.put('https://latechforce.com', requestBody)
    const data = await response.text()

    expect(response.status).toBe(404)
    expect(data).toContain('Cannot PUT')
  })
})
