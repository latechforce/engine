import { container, testServer } from './setup'

async function globalTeardown() {
  // Note: We intentionally keep the template databases between test runs
  // They will be reused in subsequent test runs for faster execution
  // SQLite template is kept in tmp/e2e_template.db
  // PostgreSQL template is kept in the container as e2e_template_db
  
  if (container) {
    await container.stop()
  }
  if (testServer) {
    testServer.close()
  }
}

export default globalTeardown
