import Tester, { describe, it, beforeEach, afterEach } from 'bun:test'
import { Mock } from '/test/bun'
import {
  setupPostgres,
  teardownPostgres,
} from '/infrastructure/drivers/common/DatabaseDriver/PostgreSQLDriverTestSetup'
import { configServiceDatabasePostgresqlWithTable } from '/examples/config/service/database/postgresql/withTable'
import { configServiceDatabasePostgresqlWithTableAndAutomation } from '/examples/config/service/database/postgresql/withTableAndAutomation'

const mock = new Mock(Tester)

mock.app(({ app }) => {
  describe('on start', () => {
    beforeEach(async () => {
      const url = await setupPostgres()
      process.env.DATABASE_URL = url
    })

    afterEach(async () => {
      await teardownPostgres()
      delete process.env.DATABASE_URL
    })

    it('should start an app with a PostgreSQL database', async () => {
      // WHEN
      const startedApp = await app.start(configServiceDatabasePostgresqlWithTable)

      // THEN
      await startedApp.stop()
    })

    it('should restart an app with a PostgreSQL database', async () => {
      // GIVEN
      const startedApp = await app.start(configServiceDatabasePostgresqlWithTable)
      await startedApp.stop()

      // WHEN
      const restartedApp = await app.start(configServiceDatabasePostgresqlWithTable)

      // THEN
      await restartedApp.stop()
    })

    it('should start an app with a PostgreSQL database and an automation', async () => {
      // WHEN
      const startedApp = await app.start(configServiceDatabasePostgresqlWithTableAndAutomation)

      // THEN
      await startedApp.stop()
    })

    it('should restart an app with a PostgreSQL database and an automation', async () => {
      // GIVEN
      const startedApp = await app.start(configServiceDatabasePostgresqlWithTableAndAutomation)
      await startedApp.stop()

      // WHEN
      const restartedApp = await app.start(configServiceDatabasePostgresqlWithTableAndAutomation)

      // THEN
      await restartedApp.stop()
    })
  })
})
