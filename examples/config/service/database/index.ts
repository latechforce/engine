import type { Config } from '/src'

export const configServiceDatabase: Config = {
  name: 'App with a database',
  services: {
    database: {
      type: 'PostgreSQL',
      url: 'postgresql://postgres:postgres@localhost:5432/postgres',
    },
  },
}
