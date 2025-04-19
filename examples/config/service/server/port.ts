import type { Config } from '/src'

export const configServiceServerPort: Config = {
  name: 'App with port',
  services: {
    server: {
      port: '6543',
    },
  },
}
