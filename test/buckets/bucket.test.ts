import Tester, { expect, describe, it } from 'bun:test'
import { IntegrationTest } from '@test/integration'
import { getFirstBucketConfig } from '@test/config'

new IntegrationTest(Tester).with(
  { drivers: ['Database', 'Storage', 'SpreadsheetLoader'] },
  ({ app, drivers }) => {
    describe('on start', () => {
      it('should create a bucket', async () => {
        // GIVEN
        const config = getFirstBucketConfig()

        // WHEN
        await app.start(config)

        // THEN
        expect(drivers.storage.bucket(config.buckets[0].name).exists()).resolves.toBe(true)
      })
    })
  }
)
