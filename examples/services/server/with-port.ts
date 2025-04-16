import type { Config } from '@latechforce/engine'

export const withPort: Config = {
  name: 'App with port',
  version: '1.0.0',
  engine: 'latest',
  services: {
    server: {
      port: '6543',
    },
  },
}

export default withPort
