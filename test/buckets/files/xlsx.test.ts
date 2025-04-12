import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstBucketSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database', 'Storage'] })

mock.app(({ app, drivers }) => {
  describe('on GET', () => {
    it('should fetch a xlsx file', async () => {
      // GIVEN
      const config = getFirstBucketSchema()
      const { url } = await app.start(config)
      await drivers.storage.bucket(config.buckets[0].name).save({
        id: '1',
        name: 'test.xlsx',
        mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        data: Buffer.from('test'),
        created_at: new Date(),
      })

      // WHEN
      const response = await fetch(`${url}/api/bucket/${config.buckets[0].name}/1`)

      // THEN
      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      expect(await response.text()).toBe('test')
    })
  })
})
