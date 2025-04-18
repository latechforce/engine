import type { Config } from '/src'

export const env: Config = {
  name: 'App with env variable',
  appVersion: '{{env.APP_VERSION}}',
  services: {
    server: {
      port: '{{env.SERVER_PORT}}',
      apiKeys: ['{{env.API_KEY}}'],
    },
  },
}
