import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configBuckets } from '/examples/config/buckets'

const mock = new Mock(Tester, { drivers: ['Database', 'Storage'] })

mock.request(({ app, drivers }) => {
  describe('on start', () => {
    it('should create a bucket', async () => {
      // WHEN
      await app.start(configBuckets)

      // THEN
      expect(drivers.storage.bucket(configBuckets.buckets![0].name).exists()).resolves.toBe(true)
    })

    it('should not create a notion bucket if there is no notion config', async () => {
      // WHEN
      await app.start(configBuckets)

      // THEN
      expect(drivers.storage.bucket('notion_files').exists()).resolves.toBe(false)
    })

    it('should create a notion bucket if there is a config', async () => {
      // WHEN
      await app.start({
        ...configBuckets,
        integrations: {
          notion: [
            {
              account: 'notion_files',
              baseUrl: ':memory:',
              token: 'test',
            },
          ],
        },
      })

      // THEN
      expect(drivers.storage.bucket('notion_files').exists()).resolves.toBe(true)
    })
  })
})
