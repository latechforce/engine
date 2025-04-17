import tester, { it, expect } from 'bun:test'
import { Mock } from '/test/bun'
import env from '/examples/env'
import defaultEnv from '/examples/defautEnv'

const mock = new Mock(tester)

mock.app(({ app }) => {
  it('should throw an error if env variables are not set', async () => {
    // WHEN
    const call = () => app.start(env)

    // THEN
    expect(call()).rejects.toThrowError(
      'Environment variable APP_VERSION not found and no default value provided'
    )
  })

  it('should start an app with default variables values', async () => {
    // WHEN
    const startedApp = await app.start(defaultEnv)

    // THEN
    expect(startedApp.appVersion).toBe('1.0.0')
    expect(startedApp.engineVersion).toBe('1.0.0')
  })

  it('should start an app with env variables', async () => {
    // GIVEN
    process.env.APP_VERSION = '2.0.0'
    process.env.ENGINE_VERSION = '2.0.0'

    // WHEN
    const startedApp = await app.start(env)

    // THEN
    expect(startedApp.appVersion).toBe('2.0.0')
    expect(startedApp.engineVersion).toBe('2.0.0')
  })
})
