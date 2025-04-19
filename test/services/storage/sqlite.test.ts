import Tester, { describe, it, beforeEach, afterEach } from 'bun:test'
import { Mock } from '/test/bun'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import { configServiceDatabaseSqliteWithTable } from '/examples/config/service/database/sqlite/withTable'

const mock = new Mock(Tester)

mock.app(({ app }) => {
  describe('on start', () => {
    let url: string

    beforeEach(async () => {
      url = `./tmp/sqlite-${nanoid()}.db`
      await fs.ensureFile(url)
      process.env.DATABASE_URL = url
    })

    afterEach(async () => {
      await fs.unlink(url)
      delete process.env.DATABASE_URL
    })

    it('should start an app with a SQLite storage', async () => {
      // WHEN
      const startedApp = await app.start(configServiceDatabaseSqliteWithTable)

      // THEN
      await startedApp.stop()
    })

    it('should restart an app with a SQLite storage', async () => {
      // GIVEN
      const startedApp = await app.start(configServiceDatabaseSqliteWithTable)
      await startedApp.stop()

      // WHEN
      const restartedApp = await app.start(configServiceDatabaseSqliteWithTable)

      // THEN
      await restartedApp.stop()
    })
  })
})
