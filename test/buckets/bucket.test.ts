import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getFirstBucketConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp(
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

      it('should not create a notion bucket if there is no config', async () => {
        // GIVEN
        const config = getFirstBucketConfig()

        // WHEN
        await app.start(config)

        // THEN
        expect(drivers.storage.bucket('notion_files').exists()).resolves.toBe(false)
      })

      it('should create a notion bucket if there is a config', async () => {
        // GIVEN
        const config = getFirstBucketConfig()

        // WHEN
        await app.start({
          ...config,
          integrations: {
            notion: {
              token: 'token',
            },
          },
        })

        // THEN
        expect(drivers.storage.bucket('notion_files').exists()).resolves.toBe(false)
      })
    })
  }
)
