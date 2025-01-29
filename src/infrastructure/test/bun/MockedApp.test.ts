import { test, expect } from 'bun:test'
import { MockedApp, mockedFetcher } from './MockedApp'

test('should instanciate a MockedApp', async () => {
  // WHEN
  const mockedApp = new MockedApp()

  // THEN
  expect(mockedApp).toBeDefined()
})

test('should return a mocked response from fetcher', async () => {
  // GIVEN
  const mockedApp = new MockedApp()
  const { services } = await mockedApp.start({ name: 'Test' })
  mockedFetcher.addEndpoint('GET', 'https://example.com/api/test', () => {
    return new Response('Test Response', { status: 200 })
  })

  // WHEN
  const response = await services.fetcher.get('https://example.com/api/test')

  // THEN
  expect(response.status).toBe(200)
  expect(await response.text()).toBe('Test Response')
})
