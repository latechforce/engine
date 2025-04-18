import tester, { it, expect } from 'bun:test'
import { Mock } from '/test/bun'
import { env } from '/examples/env'
import { defaultEnv } from '/examples/defautEnv'

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

  it('should set default app version', async () => {
    // WHEN
    const startedApp = await app.start(defaultEnv)

    // THEN
    expect(startedApp.config.appVersion).toBe('1.0.0')
  })

  it('should set default server port', async () => {
    // WHEN
    const startedApp = await app.start(defaultEnv)

    // THEN
    expect(startedApp.config.services?.server?.port).toBe('8080')
  })

  it('should set default API keys', async () => {
    // WHEN
    const startedApp = await app.start(defaultEnv)

    // THEN
    expect(startedApp.config.services?.server?.apiKeys).toEqual(['123456'])
  })

  it('should set app version from env variables', async () => {
    // GIVEN
    process.env.APP_VERSION = '2.0.0'
    process.env.SERVER_PORT = '8081'
    process.env.API_KEY = '1234567890'

    // WHEN
    const startedApp = await app.start(env)

    // THEN
    expect(startedApp.config.appVersion).toBe('2.0.0')
  })

  it('should set server port from env variables', async () => {
    // GIVEN
    process.env.APP_VERSION = '2.0.0'
    process.env.SERVER_PORT = '8081'
    process.env.API_KEY = '1234567890'

    // WHEN
    const startedApp = await app.start(env)

    // THEN
    expect(startedApp.config.services?.server?.port).toBe('8081')
  })

  it('should set API keys from env variables', async () => {
    // GIVEN
    process.env.APP_VERSION = '2.0.0'
    process.env.SERVER_PORT = '8081'
    process.env.API_KEY = '1234567890'

    // WHEN
    const startedApp = await app.start(env)

    // THEN
    expect(startedApp.config.services?.server?.apiKeys).toEqual(['1234567890'])
  })
})
