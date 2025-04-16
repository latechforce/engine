import type { Config } from '@latechforce/engine'

export const withEnv: Config = {
  name: 'App with env variables',
  version: '{{env.APP_CONFIG_VERSION}}',
  engine: '{{env.APP_ENGINE_VERSION}}',
}

export default withEnv
