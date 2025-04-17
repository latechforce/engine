import type { Config } from '@latechforce/engine'

export const withEnv: Config = {
  name: 'App with default env variables',
  appVersion: '{{env.APP_VERSION "1.0.0"}}',
  engineVersion: '{{env.ENGINE_VERSION "1.0.0"}}',
}

export default withEnv
