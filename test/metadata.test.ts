import { describe, it, expect } from 'bun:test'
import App from '@/app'
import metadata from '@/example/metadata'

describe('start', () => {
  it('should have the default name', async () => {
    // WHEN
    const app = await new App().start()

    // THEN
    expect(app.schema.name).toBe('My app')
  })

  it('should have the default version', async () => {
    // WHEN
    const app = await new App().start()

    // THEN
    expect(app.schema.version).toBe('1.0.0')
  })

  it('should have the default description', async () => {
    // WHEN
    const app = await new App().start()

    // THEN
    expect(app.schema.description).toBe('My app description')
  })
})

describe('start with metadata', () => {
  it('should have a name', async () => {
    // WHEN
    const app = await new App().start(metadata)

    // THEN
    expect(app.schema.name).toBe('App with metadata')
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
