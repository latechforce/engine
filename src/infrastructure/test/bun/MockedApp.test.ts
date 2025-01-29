import { test, expect } from 'bun:test'
import { MockedApp } from './MockedApp'

test('should instanciate a MockedApp', async () => {
  // WHEN
  const mockedApp = new MockedApp()

  // THEN
  expect(mockedApp).toBeDefined()
})
