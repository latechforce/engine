import { test, expect } from 'bun:test'
import { drivers } from '/infrastructure/drivers/bun'
import { mocks } from '/infrastructure/integrations/bun/mocks'
import App from '.'

test('should instanciate an App', async () => {
  expect(new App({ drivers })).toBeDefined()
})

test('should instanciate an App with mocked integrations', async () => {
  expect(new App({ drivers, integrations: mocks })).toBeDefined()
})
