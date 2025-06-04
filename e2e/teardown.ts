import { container, server } from './setup'

async function globalTeardown() {
  if (container) {
    await container.stop()
  }
  if (server) {
    server.close()
  }
}

export default globalTeardown
