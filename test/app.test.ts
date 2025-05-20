import { describe, it, expect } from 'bun:test'
import App from '@/app'
import { metadata } from '@/example/metadata'

describe('validate', () => {
  it('should throw an error if there are unrecognized keys', async () => {
    // WHEN
    const result = await new App().validate({ invalid: 'schema' })

    // THEN
    expect(result.error).toBeDefined()
  })
})

describe('start', () => {
  it('should throw an error if there are unrecognized keys', async () => {
    // WHEN
    const call = () => new App().start({ invalid: 'schema' })

    // THEN
    expect(call).toThrow('Invalid app schema')
  })

  it('should have the default name', async () => {
    // WHEN
    const app = await new App().start()

    // THEN
    expect(app.schema.name).toBe('My fantastic app')
  })

  it('should have the default version', async () => {
    // WHEN
    const app = await new App().start()

    // THEN
    expect(app.schema.version).toBe('0.0.1')
  })

  it('should have the default description', async () => {
    // WHEN
    const app = await new App().start()

    // THEN
    expect(app.schema.description).toBe('My fantastic app description')
  })
})

describe('start with metadata', () => {
  it('should have a name', async () => {
    // WHEN
    const app = await new App().start(metadata)

    // THEN
    expect(app.schema.name).toBe('My App')
  })

  it('should have a version', async () => {
    // WHEN
    const app = await new App().start(metadata)

    // THEN
    expect(app.schema.version).toBe('1.0.0')
  })

  it('should have a description', async () => {
    // WHEN
    const app = await new App().start(metadata)

    // THEN
    expect(app.schema.description).toBe('My App Description')
  })
})
