import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { singleLineText } from '../../examples/config/table/field/type/singleLineText'
import { required } from '../../examples/config/table/field/required'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on API POST', () => {
    it('should return an error if table does not exist', async () => {
      // GIVEN
      const { url } = await app.start(singleLineText)

      // WHEN
      const response = await request.post(`${url}/api/table/unknown`, {
        single_line_text: 'John',
      })

      // THEN
      expect(response.error).toBe('Table "unknown" not found')
    })

    it('should create a record', async () => {
      // GIVEN
      const { url } = await app.start(singleLineText)

      // WHEN
      await request.post(`${url}/api/table/${singleLineText.tables![0].name}`, {
        single_line_text: 'John',
      })

      // THEN
      const record = await drivers.database
        .tableFromSchema(singleLineText.tables![0])
        .read({ field: 'single_line_text', operator: 'Is', value: 'John' })
      expect(record).toBeDefined()
      expect(record!.id).toBeDefined()
      expect(record!.fields.single_line_text).toBe('John')
    })

    it('should return a created record', async () => {
      // GIVEN
      const { url } = await app.start(singleLineText)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${singleLineText.tables![0].name}`, {
        single_line_text: 'John',
      })

      // THEN
      expect(record).toBeDefined()
      expect(record.id).toBeDefined()
      expect(record.fields.single_line_text).toBe('John')
    })

    describe('should not create a record with', () => {
      it('an empty required field', async () => {
        // GIVEN
        const { url } = await app.start(required)

        // WHEN
        const response = await request.post(`${url}/api/table/${required.tables![0].name}`, {
          single_line_text: '',
        })

        // THEN
        expect(response.error).toBe('Field "single_line_text" is required')
      })
    })

    describe('should create a record with', () => {
      it('an id property with a length of 27', async () => {
        // GIVEN
        const { url } = await app.start(singleLineText)

        // WHEN
        await request.post(`${url}/api/table/${singleLineText.tables![0].name}`, {
          single_line_text: 'John',
        })

        // THEN
        const record = await drivers.database
          .tableFromSchema(singleLineText.tables![0])
          .read({ field: 'single_line_text', operator: 'Is', value: 'John' })
        expect(record).toBeDefined()
        expect(record!.id).toBeDefined()
        expect(record!.id).toHaveLength(27)
      })

      it('a created_at property', async () => {
        // GIVEN
        const { url } = await app.start(singleLineText)

        // WHEN
        await request.post(`${url}/api/table/${singleLineText.tables![0].name}`, {
          single_line_text: 'John',
        })

        // THEN
        const record = await drivers.database
          .tableFromSchema(singleLineText.tables![0])
          .read({ field: 'single_line_text', operator: 'Is', value: 'John' })
        expect(record).toBeDefined()
        expect(record!.created_at).toBeDefined()
      })

      it('a required field', async () => {
        // GIVEN
        const { url } = await app.start(required)

        // WHEN
        await request.post(`${url}/api/table/${required.tables![0].name}`, {
          single_line_text: 'John',
        })

        // THEN
        const record = await drivers.database
          .tableFromSchema(required.tables![0])
          .read({ field: 'single_line_text', operator: 'Is', value: 'John' })
        expect(record).toBeDefined()
        expect(record!.fields.single_line_text).toBe('John')
      })
    })
  })
})
