import { TableMapper } from '/adapter/api/mappers/TableMapper'
import type { IDatabaseDriver } from '/adapter/spi/drivers/DatabaseSpi'
import { configTableWithAllFields } from '/examples/config/table/withAllFields'
import type BunTester from 'bun:test'

export function testDatabaseDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  setup: () => Promise<IDatabaseDriver>,
  teardown?: () => Promise<void>
) {
  let database: IDatabaseDriver

  beforeAll(async () => {
    database = await setup()
  })

  afterAll(async () => {
    await database.disconnect()
    if (teardown) await teardown()
  })

  describe('table', () => {
    it('should return a table driver', async () => {
      expect(
        database.table(TableMapper.toConfig(configTableWithAllFields.tables![0]))
      ).toBeDefined()
    })
  })
}
