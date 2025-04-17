import type { Config } from '/src'

export const withBaseUrl: Config = {
  name: 'App with base url',
  services: {
    server: {
      baseUrl: 'http://custom-url.com',
    },
  },
}

export default withBaseUrl
