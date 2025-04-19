import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configTableFieldRollupNumberSum } from '/examples/config/table/field/rollup/number/sum'
import { configTableFieldRollupSingleLineTextConcat } from '/examples/config/table/field/rollup/singleLineText/concat'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    describe('should create a table with a single line text rollup field and', () => {
      it('a CONCAT formula', async () => {
        // WHEN
        const call = () => app.start(configTableFieldRollupSingleLineTextConcat)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })

    describe('should create a table with a number rollup field and', () => {
      it('a SUM formula', async () => {
        // GIVEN
        const call = () => app.start(configTableFieldRollupNumberSum)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })
  })

  describe('on POST', () => {
    describe('should create a record with a single line text rollup and', () => {
      it('a CONCAT formula', async () => {
        // GIVEN
        const { url } = await app.start(configTableFieldRollupSingleLineTextConcat)
        await drivers.database
          .tableFromSchema(configTableFieldRollupSingleLineTextConcat.tables![1])
          .insertMany([
            { id: '1', fields: { single_line_text: 'John' }, created_at: new Date().toISOString() },
            { id: '2', fields: { single_line_text: 'Jean' }, created_at: new Date().toISOString() },
          ])

        // WHEN
        const { record } = await request.post(
          `${url}/api/table/${configTableFieldRollupSingleLineTextConcat.tables![0].name}`,
          {
            multiple_linked_record: ['1', '2'],
          }
        )

        // THEN
        expect(record.fields.rollup).toBe('John, Jean')
      })
    })

    describe('should create a record with a number rollup and', () => {
      it('a SUM formula', async () => {
        // GIVEN
        const { url } = await app.start(configTableFieldRollupNumberSum)
        await drivers.database
          .tableFromSchema(configTableFieldRollupNumberSum.tables![1])
          .insertMany([
            { id: '1', fields: { number: 5 }, created_at: new Date().toISOString() },
            { id: '2', fields: { number: 5 }, created_at: new Date().toISOString() },
          ])

        // WHEN
        const { record } = await request.post(
          `${url}/api/table/${configTableFieldRollupNumberSum.tables![0].name}`,
          {
            multiple_linked_record: ['1', '2'],
          }
        )

        // THEN
        expect(record.fields.rollup).toBe(10)
      })
    })
  })
})
