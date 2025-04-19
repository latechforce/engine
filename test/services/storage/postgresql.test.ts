import Tester, { describe, it, beforeEach, afterEach } from 'bun:test'
import { Mock } from '/test/bun'
import {
  setupPostgres,
  teardownPostgres,
} from '/infrastructure/drivers/common/DatabaseDriver/PostgreSQLDriverTestSetup'
import { withTable } from '/examples/config/service/database/postgresql/withTable'

const mock = new Mock(Tester)

mock.app(({ app }) => {
  describe('on start', () => {
    let url: string

    beforeEach(async () => {
      url = await setupPostgres()
      process.env.DATABASE_URL = url
    })

    afterEach(async () => {
      await teardownPostgres()
      delete process.env.DATABASE_URL
    })

    it('should start an app with a PostgreSQL storage', async () => {
      // WHEN
      const startedApp = await app.start(withTable)

      // THEN
      await startedApp.stop()
    })

    it('should restart an app with a PostgreSQL storage', async () => {
      // GIVEN
      const startedApp = await app.start(withTable)
      await startedApp.stop()

      // WHEN
      const restartedApp = await app.start(withTable)

      // THEN
      await restartedApp.stop()
    })
  })
})
