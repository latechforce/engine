import type { Config } from '/src'

export const defaultEnv: Config = {
  name: 'App with default env variables',
  appVersion: '{{env.APP_VERSION "1.0.0"}}',
  services: {
    server: {
      port: '{{env.SERVER_PORT "8080"}}',
      apiKeys: ['{{env.API_KEY "123456"}}'],
    },
  },
}
