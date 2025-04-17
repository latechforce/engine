import type { Config } from '@latechforce/engine'

export const withEnv: Config = {
  name: 'App with env variables',
  appVersion: '{{env.APP_VERSION}}',
  engineVersion: '{{env.ENGINE_VERSION}}',
}

export default withEnv
