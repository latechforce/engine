import { describe, it, expect } from 'bun:test'
import { start } from '../src/index'

describe('App', () => {
  it('should return the app url', async () => {
    // WHEN
    const app = await start({ name: 'test' })

    // THEN
    expect(app.url).toBe('http://localhost:3000')
  })

  it('should start the app', async () => {
    // GIVEN
    const app = await start({ name: 'test' })

    // WHEN
    const response = await fetch(app.url)

    // THEN
    expect(response.status).toBe(200)
  })
})
