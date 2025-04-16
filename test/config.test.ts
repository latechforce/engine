import tester, { it, expect } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { config } from '/examples/config'
import withEnv from '/examples/with-env'
import withDefaultEnv from '/examples/with-default-env'

const mock = new Mock(tester)

mock.app(({ app }) => {
  it('should throw an error if config is empty', async () => {
    // GIVEN
    const emptyConfig = {} as Config

    // WHEN
    const call = () => app.start(emptyConfig)

    // THEN
    expect(call()).rejects.toThrowError("must have required property 'name'")
  })

  it('should start an app', async () => {
    // WHEN
    const startedApp = await app.start(config)

    // THEN
    expect(startedApp.url).toBeDefined()
  })

  it('should throw an error if env variables are not set', async () => {
    // WHEN
    const call = () => app.start(withEnv)

    // THEN
    expect(call()).rejects.toThrowError(
      'Environment variable APP_CONFIG_VERSION not found and no default value provided'
    )
  })

  it('should start an app with default variables values', async () => {
    // WHEN
    const startedApp = await app.start(withDefaultEnv)

    // THEN
    expect(startedApp.version).toBe('1.0.0')
    expect(startedApp.engine).toBe('1.0.0')
  })

  it('should start an app with env variables', async () => {
    // GIVEN
    process.env.APP_CONFIG_VERSION = '2.0.0'
    process.env.APP_ENGINE_VERSION = '2.0.0'

    // WHEN
    const startedApp = await app.start(withEnv)

    // THEN
    expect(startedApp.version).toBe('2.0.0')
    expect(startedApp.engine).toBe('2.0.0')
  })

  it('should check the app running status through /api/health endpoint', async () => {
    // GIVEN
    const startedApp = await app.start(config)

    // WHEN
    const { success } = await fetch(startedApp.url + '/api/health').then((res) => res.json())

    // THEN
    expect(success).toBe(true)
  })

  it('should stop an app', async () => {
    // GIVEN
    const startedApp = await app.start(config)

    // WHEN
    await startedApp.stop()

    // THEN
    const response = await fetch(startedApp.url).catch((err) => err)
    expect(response.code).toContain('ConnectionRefused')
  })
})
