import BunTester, { test, expect } from 'bun:test'
import { Helpers } from './Helpers'

test('should instanciate a Helpers with Bun', async () => {
  // WHEN
  const helpers = new Helpers(BunTester)

  // THEN
  expect(helpers).toBeDefined()
})

const helpers = new Helpers(BunTester)

// GIVEN
helpers.testWithMockedApp({}, ({ app, request }) => {
  // WHEN
  test('should have a provided app', () => {
    // THEN
    expect(app).toBeDefined()
  })

  // WHEN
  test('should have a provided request', () => {
    // THEN
    expect(request).toBeDefined()
  })
})

// GIVEN
helpers.testWithMockedApp({ drivers: ['Database'] }, ({ drivers }) => {
  // WHEN
  test('should have a Database driver', () => {
    // THEN
    expect(drivers.database).toBeDefined()
  })
})

// GIVEN
helpers.testWithMockedApp({ drivers: ['Database', 'Storage'] }, ({ drivers }) => {
  // WHEN
  test('should have a Database and a Storage driver', () => {
    // THEN
    expect(drivers.database).toBeDefined()
    expect(drivers.storage).toBeDefined()
  })
})

// GIVEN
helpers.testWithMockedApp({ drivers: ['Fetcher'] }, ({ drivers }) => {
  // WHEN
  test('should have a Fetcher driver', () => {
    // THEN
    expect(drivers.fetcher).toBeDefined()
  })
})

// GIVEN
helpers.testWithMockedApp({ integrations: ['Airtable'] }, ({ integrations }) => {
  // WHEN
  test('should have a Airtable integration', () => {
    // THEN
    expect(integrations.airtable).toBeDefined()
  })
})

// GIVEN
helpers.testWithMockedApp({ integrations: ['Notion'] }, ({ integrations }) => {
  // WHEN
  test('should have a Notion integration', () => {
    // THEN
    expect(integrations.notion).toBeDefined()
  })
})

// GIVEN
helpers.testWithMockedApp({ integrations: ['Pappers'] }, ({ integrations }) => {
  // WHEN
  test('should have a Pappers integration', () => {
    // THEN
    expect(integrations.pappers).toBeDefined()
  })
})

// GIVEN
helpers.testWithMockedApp({ integrations: ['Qonto'] }, ({ integrations }) => {
  // WHEN
  test('should have a Qonto integration', () => {
    // THEN
    expect(integrations.qonto).toBeDefined()
  })
})
