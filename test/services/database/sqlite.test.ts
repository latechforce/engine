import Tester, { describe, it, beforeEach, afterEach } from 'bun:test'
import { Mock } from '/test/bun'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import { withTableAndAutomation } from '/examples/config/service/database/sqlite/withTableAndAutomation'
import { withTable } from '/examples/config/service/database/sqlite/withTable'

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

    it('should start an app with a SQLite database', async () => {
      // WHEN
      const startedApp = await app.start(withTable)

      // THEN
      await startedApp.stop()
    })

    it('should restart an app with a SQLite database', async () => {
      // GIVEN
      const startedApp = await app.start(withTable)
      await startedApp.stop()

      // WHEN
      const restartedApp = await app.start(withTable)

      // THEN
      await restartedApp.stop()
    })

    it('should start an app with a SQLite database and an automation', async () => {
      // WHEN
      const startedApp = await app.start(withTableAndAutomation)

      // THEN
      await startedApp.stop()
    })

    it('should restart an app with a SQLite database and an automation', async () => {
      // GIVEN
      const startedApp = await app.start(withTableAndAutomation)
      await startedApp.stop()

      // WHEN
      const restartedApp = await app.start(withTableAndAutomation)

      // THEN
      await restartedApp.stop()
    })
  })
})
