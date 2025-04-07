import type { IStorageDriver } from '/adapter/spi/drivers/StorageSpi'
import type BunTester from 'bun:test'

export function testStorageDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  setup: () => Promise<IStorageDriver>,
  teardown?: () => Promise<void>
) {
  let storage: IStorageDriver

  beforeAll(async () => {
    storage = await setup()
  })

  afterAll(async () => {
    await storage.disconnect()
    if (teardown) await teardown()
  })

  describe('bucket', () => {
    it('should return a bucket driver', async () => {
      expect(storage.bucket('test')).toBeDefined()
    })
  })
}
