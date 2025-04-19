import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionServiceDatabaseReadRecord } from '/examples/config/automation/action/service/database/readRecord'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should read a record in database', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceDatabaseReadRecord)
      await drivers.database
        .table({ name: 'records', fields: [] })
        .insert({ id: '1', fields: {}, created_at: new Date().toISOString() })

      // WHEN
      const response = await request.post(`${url}/api/automation/read-record`, {
        recordId: '1',
      })

      // THEN
      expect(response.record.id).toBe('1')
    })
  })
})
