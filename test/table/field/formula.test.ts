import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { addition } from '../../../examples/config/table/field/formula/number/addition'
import { multiplication } from '../../../examples/config/table/field/formula/number/multiplication'
import { concatenation } from '../../../examples/config/table/field/formula/singleLineText/concatenation'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on app start', () => {
    describe('should create a table with a single line text formula and', () => {
      it('a concatenation', async () => {
        // GIVEN
        const call = () => app.start(concatenation)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })

    describe('should create a table with a number formula and', () => {
      it('an addition', async () => {
        // WHEN
        const call = () => app.start(addition)

        // THEN
        expect(call()).resolves.toBeDefined()
      })

      it('a multiplication', async () => {
        // WHEN
        const call = () => app.start(multiplication)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })

    it('should migrate a table with a new formula', async () => {
      // GIVEN
      await drivers.database.tableFromSchema(concatenation.tables![0]).create()
      const newConfig: Config = {
        ...concatenation,
        tables: [
          {
            ...concatenation.tables![0],
            fields: [
              ...concatenation.tables![0].fields!,
              {
                name: 'new_formula',
                type: 'Formula',
                formula: 'single_line_text || "?"',
                output: { type: 'SingleLineText' },
              },
            ],
          },
        ],
      }

      // WHEN
      const { url } = await app.start(newConfig)
      const { record } = await request.post(`${url}/api/table/${newConfig.tables![0].name}`, {
        single_line_text: 'John',
      })

      // THEN
      expect(record.fields.new_formula).toBe('John?')
    })

    it('should migrate a table with an updated formula', async () => {
      // GIVEN
      await drivers.database.tableFromSchema(concatenation.tables![0]).create()
      const newConfig: Config = {
        ...concatenation,
        tables: [
          {
            ...concatenation.tables![0],
            fields: [
              concatenation.tables![0].fields![0],
              {
                name: 'formula',
                type: 'Formula',
                formula: 'single_line_text || "?"',
                output: { type: 'SingleLineText' },
              },
            ],
          },
        ],
      }

      // WHEN
      const { url } = await app.start(newConfig)
      const { record } = await request.post(`${url}/api/table/${newConfig.tables![0].name}`, {
        single_line_text: 'John',
      })

      // THEN
      expect(record.fields.formula).toBe('John?')
    })
  })

  describe('on API POST', () => {
    describe('should create a record with a single line text formula and', () => {
      it('a concatenation', async () => {
        // GIVEN
        const { url } = await app.start(concatenation)

        // WHEN
        const { record } = await request.post(`${url}/api/table/${concatenation.tables![0].name}`, {
          single_line_text: 'John',
        })

        // THEN
        expect(record.fields.formula).toBe('John!')
      })

      it('a reference to another single line text formula', async () => {
        // GIVEN
        const config: Config = {
          ...concatenation,
          tables: [
            {
              ...concatenation.tables![0],
              fields: [
                ...concatenation.tables![0].fields!,
                {
                  name: 'formula_reference',
                  type: 'Formula',
                  formula: 'formula || "!"',
                  output: { type: 'SingleLineText' },
                },
              ],
            },
          ],
        }
        const { url } = await app.start(config)

        // WHEN
        const { record } = await request.post(`${url}/api/table/${config.tables![0].name}`, {
          single_line_text: 'John',
        })

        // THEN
        expect(record.fields.formula_reference).toBe('John!!')
      })
    })

    describe('should create a record with a number formula and', () => {
      it('an addition', async () => {
        // GIVEN
        const { url } = await app.start(addition)

        // WHEN
        const { record } = await request.post(`${url}/api/table/${addition.tables![0].name}`, {
          number: 10,
        })

        // THEN
        expect(record.fields.formula).toBe(11)
      })

      it('a multiplication', async () => {
        // GIVEN
        const { url } = await app.start(multiplication)

        // WHEN
        const { record } = await request.post(
          `${url}/api/table/${multiplication.tables![0].name}`,
          {
            number: 10,
          }
        )

        // THEN
        expect(record.fields.formula).toBe(100)
      })

      it('a reference to another number formula', async () => {
        // GIVEN
        const config: Config = {
          ...multiplication,
          tables: [
            {
              ...multiplication.tables![0],
              fields: [
                ...multiplication.tables![0].fields!,
                {
                  name: 'formula_reference',
                  type: 'Formula',
                  formula: 'formula * 10',
                  output: { type: 'Number' },
                },
              ],
            },
          ],
        }
        const { url } = await app.start(config)

        // WHEN
        const { record } = await request.post(`${url}/api/table/${config.tables![0].name}`, {
          number: 10,
        })

        // THEN
        expect(record.fields.formula_reference).toBe(1000)
      })
    })
  })
})
