import type { Config } from '/src'

export const withPort: Config = {
  name: 'App with port',
  services: {
    server: {
      port: '6543',
    },
  },
}

export default withPort
