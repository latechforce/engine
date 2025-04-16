import type { Config } from '@latechforce/engine'

export const withBaseUrl: Config = {
  name: 'App with base url',
  version: '1.0.0',
  engine: 'latest',
  services: {
    server: {
      baseUrl: 'http://custom-url.com',
    },
  },
}

export default withBaseUrl
