import { describe, expect, it } from 'bun:test'
import { start } from '../src/index'
import type { AppSchema } from '/domain/schemas/app.schema'

describe('table', () => {
  it('should start a table', async () => {
    // GIVEN
    const schema: AppSchema = { name: 'test', tables: [{ id: 1, name: 'test', fields: [] }] }

    // WHEN
    const app = await start(schema)

    // THEN
    expect(app.tables.length).toBe(1)
    expect(app.tables[0]?.schema.id).toBe(1)
    expect(app.tables[0]?.schema.name).toBe('test')
    expect(app.tables[0]?.schema.fields.length).toBe(0)
  })
})
