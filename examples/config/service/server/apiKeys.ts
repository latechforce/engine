import type { Config } from '/src'

export const configServiceServerApiKeys: Config = {
  name: 'App with an api key',
  services: {
    server: {
      apiKeys: ['api-key'],
    },
  },
}
