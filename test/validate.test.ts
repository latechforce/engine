import { describe, it, expect } from 'bun:test'
import App from '@/app'

describe('validate', () => {
  it('should throw an error if there are unrecognized keys', async () => {
    // WHEN
    const result = await new App().validate({ invalid: 'schema' })

    // THEN
    expect(result.error).toContain('Unrecognized key: "invalid"')
  })

  it('should throw an error if env variable is not found', async () => {
    // WHEN
    const result = await new App().validate({
      name: '{{env.VALUE}}',
    })

    // THEN
    expect(result.error).toContain(
      'Environment variable "VALUE" not found and no default value provided'
    )
  })

  it('should not throw an error if env variable is not found and default value is provided', async () => {
    // WHEN
    const result = await new App().validate({
      name: '{{env.VALUE "test"}}',
    })

    // THEN
    expect(result.error).toBeUndefined()
    expect(result.schema?.name).toBe('test')
  })
})

describe('start', () => {
  it('should throw an error if there are unrecognized keys', async () => {
    // WHEN
    const call = () => new App().start({ invalid: 'schema' })

    // THEN
    expect(call).toThrow('Invalid app schema')
  })
})
