import type { Config } from '/src'

export const configService: Config = {
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
