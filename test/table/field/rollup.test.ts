import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { sum } from '../../../examples/config/table/field/rollup/number/sum'
import { concat } from '../../../examples/config/table/field/rollup/singleLineText/concat'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    describe('should create a table with a single line text rollup field and', () => {
      it('a CONCAT formula', async () => {
        // WHEN
        const call = () => app.start(concat)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })

    describe('should create a table with a number rollup field and', () => {
      it('a SUM formula', async () => {
        // GIVEN
        const call = () => app.start(sum)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })
  })

  describe('on POST', () => {
    describe('should create a record with a single line text rollup and', () => {
      it('a CONCAT formula', async () => {
        // GIVEN
        const { url } = await app.start(concat)
        await drivers.database.tableFromSchema(concat.tables![1]).insertMany([
          { id: '1', fields: { single_line_text: 'John' }, created_at: new Date().toISOString() },
          { id: '2', fields: { single_line_text: 'Jean' }, created_at: new Date().toISOString() },
        ])

        // WHEN
        const { record } = await request.post(`${url}/api/table/${concat.tables![0].name}`, {
          multiple_linked_record: ['1', '2'],
        })

        // THEN
        expect(record.fields.rollup).toBe('John, Jean')
      })
    })

    describe('should create a record with a number rollup and', () => {
      it('a SUM formula', async () => {
        // GIVEN
        const { url } = await app.start(sum)
        await drivers.database.tableFromSchema(sum.tables![1]).insertMany([
          { id: '1', fields: { number: 5 }, created_at: new Date().toISOString() },
          { id: '2', fields: { number: 5 }, created_at: new Date().toISOString() },
        ])

        // WHEN
        const { record } = await request.post(`${url}/api/table/${sum.tables![0].name}`, {
          multiple_linked_record: ['1', '2'],
        })

        // THEN
        expect(record.fields.rollup).toBe(10)
      })
    })
  })
})
