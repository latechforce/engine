import type { IDatabaseDriver } from '@adapter/spi/drivers/DatabaseSpi'
import { getFirstTableConfig } from '@test/config'
import type BunTester from 'bun:test'

export function testDatabaseDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  setup: () => Promise<IDatabaseDriver>,
  teardown?: () => Promise<void>
) {
  let database: IDatabaseDriver
  const config = getFirstTableConfig()

  beforeAll(async () => {
    database = await setup()
  })

  afterAll(async () => {
    if (teardown) await teardown()
  })

  describe('table', () => {
    it('should return a table driver', async () => {
      expect(database.table(config.tables[0])).toBeDefined()
    })
  })
}
