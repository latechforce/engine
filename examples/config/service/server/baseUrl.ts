import type { Config } from '/src'

export const configServiceServerBaseUrl: Config = {
  name: 'App with base url',
  services: {
    server: {
      baseUrl: 'http://custom-url.com',
    },
  },
}
