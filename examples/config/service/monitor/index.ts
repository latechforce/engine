import type { Config } from '/src'

export const configServiceMonitor: Config = {
  name: 'App with a monitor',
  services: {
    monitors: [
      {
        type: 'Sentry',
        dsn: 'https://sentry.io/your-sentry-dsn',
        environment: 'production',
      },
    ],
  },
}
