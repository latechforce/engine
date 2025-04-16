import type { Config } from '@latechforce/engine'

export const withEnv: Config = {
  name: 'App with default env variables',
  version: '{{env.APP_CONFIG_VERSION "1.0.0"}}',
  engine: '{{env.APP_ENGINE_VERSION "1.0.0"}}',
}

export default withEnv
