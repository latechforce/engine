import { it, expect, describe } from 'bun:test'
import { MockedApp, type Config } from '/test/bun'

describe('start', () => {
  it('should throw an error if config is empty', async () => {
    // GIVEN
    const config = {}
    const app = new MockedApp()

    // WHEN
    const call = () => app.start(config)

    // THEN
    expect(call()).rejects.toThrowError("must have required property 'name'")
  })

  it('should start an app', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      loggers: [],
    }
    const app = new MockedApp()

    // WHEN
    const startedApp = await app.start(config)

    // THEN
    expect(startedApp.url).toBeDefined()
    await startedApp.stop()
  })

  it('should start an app on a dedicated PORT', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      server: { port: '6543' },
      loggers: [],
    }
    const app = new MockedApp()

    // WHEN
    const startedApp = await app.start(config)

    // THEN
    expect(startedApp.url).toBe('http://localhost:6543')
    await startedApp.stop()
  })

  it('should check the app running status through /api/health endpoint', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      loggers: [],
    }
    const app = new MockedApp()
    const startedApp = await app.start(config)

    // WHEN
    const { success } = await fetch(startedApp.url + '/api/health').then((res) => res.json())

    // THEN
    expect(success).toBe(true)
    await startedApp.stop()
  })

  it('should start an app with env variables', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      description: '{{ env.DESCRIPTION }}',
      server: { port: '{{env.PORT}}' },
      loggers: [],
    }
    const app = new MockedApp({ env: { PORT: '6543', DESCRIPTION: 'App' } })

    // WHEN
    const startedApp = await app.start(config)

    // THEN
    expect(startedApp.url).toBe('http://localhost:6543')
    expect(startedApp.description).toBe('App')
    await startedApp.stop()
  })

  it('should start an app with default env variables', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '{{ env.VERSION "1.0.0" }}',
      server: { port: '{{env.PORT "6543"}}' },
      loggers: [],
    }
    const app = new MockedApp()

    // WHEN
    const startedApp = await app.start(config)

    // THEN
    expect(startedApp.url).toBe('http://localhost:6543')
    expect(startedApp.version).toBe('1.0.0')
    await startedApp.stop()
  })
})

describe('stop', () => {
  it('should stop an app', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      loggers: [],
    }
    const app = new MockedApp()
    const startedApp = await app.start(config)

    // WHEN
    await startedApp.stop()
    const response = await fetch(startedApp.url).catch((err) => err)

    // THEN
    expect(response.code).toContain('ConnectionRefused')
  })
})
