import { describe, it, beforeEach, afterEach } from 'bun:test'
import { MockedApp, type Config } from '/test/bun'
import {
  setupPostgres,
  teardownPostgres,
} from '/infrastructure/drivers/common/DatabaseDriver/PostgreSQLDriverTestSetup'

describe('on start', () => {
  let url: string

  beforeEach(async () => {
    url = await setupPostgres()
  })

  afterEach(async () => {
    await teardownPostgres()
  })

  it('should start an app with a PostgreSQL database', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      tables: [
        {
          name: 'users',
          fields: [
            {
              name: 'name',
              type: 'SingleLineText',
            },
          ],
        },
      ],
      database: {
        driver: 'PostgreSQL',
        url,
      },
    }
    const app = new MockedApp()

    // WHEN
    const startedApp = await app.start(config)

    // THEN
    await startedApp.stop()
  })

  it('should restart an app with a PostgreSQL database', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      tables: [
        {
          name: 'users',
          fields: [
            {
              name: 'name',
              type: 'SingleLineText',
            },
          ],
        },
      ],
      database: {
        driver: 'PostgreSQL',
        url,
      },
    }
    const app = new MockedApp()
    const startedApp = await app.start(config)
    await startedApp.stop()

    // WHEN
    const restartedApp = await app.start(config)

    // THEN
    await restartedApp.stop()
  })
})
