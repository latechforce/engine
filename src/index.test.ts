import { test, expect } from 'bun:test'
import App, { packages, mocks } from './index'

test('should export packages', async () => {
  expect(packages).toBeDefined()
})

test('should instanciate an App', async () => {
  expect(new App()).toBeDefined()
})

test('should instanciate an App with mocked integrations', async () => {
  expect(new App({ integrations: mocks })).toBeDefined()
})
