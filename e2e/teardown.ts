import { container, testServer } from './setup'

async function globalTeardown() {
  if (container) {
    await container.stop()
  }
  if (testServer) {
    testServer.close()
  }
}

export default globalTeardown
