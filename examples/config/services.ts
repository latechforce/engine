import type { Config } from '/src'

export const configServices: Config = {
  name: 'App with services',
  services: {
    server: {
      port: 3000,
    },
    database: {
      type: 'SQLite',
      url: './tmp/database.sqlite',
    },
  },
}
