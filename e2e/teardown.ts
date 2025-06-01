import { container } from './setup'

async function globalTeardown() {
  if (container) {
    await container.stop()
  }
}

export default globalTeardown
