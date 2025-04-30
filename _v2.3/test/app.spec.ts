import { describe, it, expect } from 'bun:test'
import { start } from '../src/index'

describe('app', () => {
  it('should throw an error if config has no name', async () => {
    // GIVEN
    const emptyConfig = {}

    // WHEN
    const call = () => start(emptyConfig)

    // THEN
    expect(call()).rejects.toThrowError('Validation Errors:\n- [name] Required')
  })

  it('should return 200 status code for health check', async () => {
    // GIVEN
    const app = await start({ name: 'test' })

    // WHEN
    const response = await fetch(`${app.url}/health`)

    // THEN
    expect(response.status).toBe(200)
  })
})
