import type { Config } from '@latechforce/engine'

export const withPort: Config = {
  name: 'App with port',
  services: {
    server: {
      port: '6543',
    },
  },
}

export default withPort
