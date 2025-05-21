import { expect, test } from '@/e2e/fixtures'
import { PostgreSqlContainer } from '@testcontainers/postgresql'

test('should start with a custom postgres DATABASE_URL', async ({ startExampleApp }) => {
  // GIVEN
  const container = await new PostgreSqlContainer().start()

  // WHEN
  const call = async () =>
    startExampleApp({
      test,
      env: {
        DATABASE_URL: container.getConnectionUri(),
      },
    })

  try {
    // THEN
    await expect(call()).resolves.not.toThrow()
  } finally {
    await container.stop()
  }
})
