import { test, expect } from 'bun:test'
import { mocks } from '/infrastructure/integrations/bun/mocks'
import App from './bun'

test('should instanciate an App', async () => {
  expect(new App()).toBeDefined()
})

test('should instanciate an App with mocked integrations', async () => {
  expect(new App({ integrations: mocks })).toBeDefined()
})
