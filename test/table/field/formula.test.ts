import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { configTableFieldFormulaNumberAddition } from '/examples/config/table/field/formula/number/addition'
import { configTableFieldFormulaNumberMultiplication } from '/examples/config/table/field/formula/number/multiplication'
import { configTableFieldFormulaSingleLineTextConcatenation } from '/examples/config/table/field/formula/singleLineText/concatenation'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    describe('should create a table with a single line text formula and', () => {
      it('a concatenation', async () => {
        // GIVEN
        const call = () => app.start(configTableFieldFormulaSingleLineTextConcatenation)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })

    describe('should create a table with a number formula and', () => {
      it('an addition', async () => {
        // WHEN
        const call = () => app.start(configTableFieldFormulaNumberAddition)

        // THEN
        expect(call()).resolves.toBeDefined()
      })

      it('a multiplication', async () => {
        // WHEN
        const call = () => app.start(configTableFieldFormulaNumberMultiplication)

        // THEN
        expect(call()).resolves.toBeDefined()
      })
    })

    it('should migrate a table with a new formula', async () => {
      // GIVEN
      await drivers.database
        .tableFromSchema(configTableFieldFormulaSingleLineTextConcatenation.tables![0])
        .create()
      const newConfig: Config = {
        ...configTableFieldFormulaSingleLineTextConcatenation,
        tables: [
          {
            ...configTableFieldFormulaSingleLineTextConcatenation.tables![0],
            fields: [
              ...configTableFieldFormulaSingleLineTextConcatenation.tables![0].fields!,
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
      await drivers.database
        .tableFromSchema(configTableFieldFormulaSingleLineTextConcatenation.tables![0])
        .create()
      const newConfig: Config = {
        ...configTableFieldFormulaSingleLineTextConcatenation,
        tables: [
          {
            ...configTableFieldFormulaSingleLineTextConcatenation.tables![0],
            fields: [
              configTableFieldFormulaSingleLineTextConcatenation.tables![0].fields![0],
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

  describe('on POST', () => {
    describe('should create a record with a single line text formula and', () => {
      it('a concatenation', async () => {
        // GIVEN
        const { url } = await app.start(configTableFieldFormulaSingleLineTextConcatenation)

        // WHEN
        const { record } = await request.post(
          `${url}/api/table/${configTableFieldFormulaSingleLineTextConcatenation.tables![0].name}`,
          {
            single_line_text: 'John',
          }
        )

        // THEN
        expect(record.fields.formula).toBe('John!')
      })

      it('a reference to another single line text formula', async () => {
        // GIVEN
        const config: Config = {
          ...configTableFieldFormulaSingleLineTextConcatenation,
          tables: [
            {
              ...configTableFieldFormulaSingleLineTextConcatenation.tables![0],
              fields: [
                ...configTableFieldFormulaSingleLineTextConcatenation.tables![0].fields!,
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
        const { url } = await app.start(configTableFieldFormulaNumberAddition)

        // WHEN
        const { record } = await request.post(
          `${url}/api/table/${configTableFieldFormulaNumberAddition.tables![0].name}`,
          {
            number: 10,
          }
        )

        // THEN
        expect(record.fields.formula).toBe(11)
      })

      it('a multiplication', async () => {
        // GIVEN
        const { url } = await app.start(configTableFieldFormulaNumberMultiplication)

        // WHEN
        const { record } = await request.post(
          `${url}/api/table/${configTableFieldFormulaNumberMultiplication.tables![0].name}`,
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
          ...configTableFieldFormulaNumberMultiplication,
          tables: [
            {
              ...configTableFieldFormulaNumberMultiplication.tables![0],
              fields: [
                ...configTableFieldFormulaNumberMultiplication.tables![0].fields!,
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
