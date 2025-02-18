import { describe, it, beforeEach, afterEach } from 'bun:test'
import { MockedApp, type Config } from '/test/bun'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'

describe('on start', () => {
  let url: string

  beforeEach(async () => {
    url = `./tmp/sqlite-${nanoid()}.db`
    await fs.ensureFile(url)
  })

  afterEach(async () => {
    await fs.unlink(url)
  })

  it('should start an app with a SQLite database', async () => {
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
        driver: 'SQLite',
        url,
      },
    }
    const app = new MockedApp()

    // WHEN
    const startedApp = await app.start(config)

    // THEN
    await startedApp.stop()
  })

  it('should restart an app with a SQLite database', async () => {
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
        driver: 'SQLite',
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

  it('should start an app with a SQLite database and an automation', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      automations: [
        {
          name: 'onUserCreated',
          trigger: {
            service: 'Database',
            event: 'RecordCreated',
            table: 'users',
          },
          actions: [],
        },
      ],
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
        driver: 'SQLite',
        url,
      },
    }
    const app = new MockedApp()

    // WHEN
    const startedApp = await app.start(config)

    // THEN
    await startedApp.stop()
  })

  it('should restart an app with a SQLite database and an automation', async () => {
    // GIVEN
    const config: Config = {
      name: 'App',
      version: '1.0.0',
      automations: [
        {
          name: 'onUserCreated',
          trigger: {
            service: 'Database',
            event: 'RecordCreated',
            table: 'users',
          },
          actions: [],
        },
      ],
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
        driver: 'SQLite',
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
