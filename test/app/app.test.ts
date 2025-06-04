import { describe, it, expect } from 'bun:test'
import App from '@/app'

describe('start', () => {
  it('should throw an error if there are unrecognized keys', async () => {
    // WHEN
    const call = () => new App().start({ invalid: 'schema' })

    // THEN
    expect(call).toThrow('Invalid app schema')
  })
})
