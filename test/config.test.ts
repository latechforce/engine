import tester, { it, expect, describe } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { config } from '../examples/config'
import { configDescription } from '/examples/config/description'
import { configAppVersion } from '/examples/config/appVersion'
import { configEngineVersion } from '/examples/config/engineVersion'

const mock = new Mock(tester)

mock.app(({ app }) => {
  it('should throw an error if config has no name', async () => {
    // GIVEN
    const emptyConfig = {} as Config

    // WHEN
    const call = () => app.start(emptyConfig)

    // THEN
    expect(call()).rejects.toThrowError("must have required property 'name'")
  })

  describe('should start an app', () => {
    it('with a name', async () => {
      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp.config.name).toBe('App')
    })

    it('with a description', async () => {
      // WHEN
      const startedApp = await app.start(configDescription)

      // THEN
      expect(startedApp.config.description).toBe('App description')
    })

    it('with an app version', async () => {
      // WHEN
      const startedApp = await app.start(configAppVersion)

      // THEN
      expect(startedApp.config.appVersion).toBe('1.0.0')
    })

    it('with an engine version', async () => {
      // WHEN
      const startedApp = await app.start(configEngineVersion)

      // THEN
      expect(startedApp.config.engineVersion).toBe('1.0.0')
    })
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
