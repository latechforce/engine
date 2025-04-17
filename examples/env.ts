import type { Config } from '/src'

export const env: Config = {
  name: 'App with env variable',
  appVersion: '{{env.APP_VERSION}}',
  engineVersion: '{{env.ENGINE_VERSION}}',
}

export default env
