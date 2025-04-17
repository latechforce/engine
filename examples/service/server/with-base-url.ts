import type { Config } from '@latechforce/engine'

export const withBaseUrl: Config = {
  name: 'App with base url',
  services: {
    server: {
      baseUrl: 'http://custom-url.com',
    },
  },
}

export default withBaseUrl
