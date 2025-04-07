import type BunTester from 'bun:test'
import type { IStorageBucketDriver } from '/adapter/spi/drivers/StorageBucketSpi'

export function testStorageBucketDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  setup: () => Promise<IStorageBucketDriver>,
  teardown?: () => Promise<void>
) {
  let bucket: IStorageBucketDriver

  beforeAll(async () => {
    bucket = await setup()
  })

  afterAll(async () => {
    if (teardown) await teardown()
  })

  describe('create', () => {
    it('should create a bucket', async () => {
      // THEN
      await bucket.create()
    })
  })

  describe('save', () => {
    it('should save a file', async () => {
      // WHEN
      const call = () =>
        bucket.save({
          id: '1',
          name: 'test.txt',
          data: Buffer.from('test'),
          created_at: new Date(),
          mime_type: 'text/plain',
        })

      // THEN
      expect(call()).resolves.toBeUndefined()
    })
  })

  describe('readById', () => {
    it('should read a file', async () => {
      // WHEN
      const result = await bucket.readById('1')

      // THEN
      expect(result).toBeDefined()
      expect(result?.id).toBe('1')
      expect(result?.name).toBe('test.txt')
      expect(result?.data).toStrictEqual(Buffer.from('test'))
      expect(result?.created_at).toBeInstanceOf(Date)
      expect(result?.mime_type).toBe('text/plain')
    })
  })
}
