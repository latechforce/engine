import { describe, it } from 'bun:test'
import { instrument } from '/infrastructure/instrument/bun'
import { MockedApp, type Config } from '/test/bun'
import env from '/infrastructure/test/env'

describe('on start', () => {
  it('should start an app with Sentry monitor', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      services: {
        monitors: [
          {
            driver: 'Sentry',
            dsn: env.TEST_SENTRY_DSN,
            environment: 'test',
          },
        ],
      },
    }
    const app = new MockedApp()

    // WHEN
    instrument(config)
    const startedApp = await app.start(config)

    // THEN
    await startedApp.stop()
  })

  it('should start an app with Sentry monitor and a name with spaces', async () => {
    // GIVEN
    const config: Config = {
      name: 'La Tech Force App',
      services: {
        monitors: [
          {
            driver: 'Sentry',
            dsn: env.TEST_SENTRY_DSN,
            environment: 'test',
          },
        ],
      },
    }
    const app = new MockedApp()

    // WHEN
    instrument(config)
    const startedApp = await app.start(config)

    // THEN
    await startedApp.stop()
  })
})
