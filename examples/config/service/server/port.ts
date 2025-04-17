import type { Config } from '/src'

export const port: Config = {
  name: 'App with port',
  services: {
    server: {
      port: '6543',
    },
  },
}
