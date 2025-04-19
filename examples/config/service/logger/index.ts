import type { Config } from '/src'

export const configServiceLogger: Config = {
  name: 'App with a logger',
  services: {
    loggers: [
      {
        type: 'Console',
        level: 'info',
      },
    ],
  },
}
