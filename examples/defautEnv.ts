import type { Config } from '/src'

export const defaultEnv: Config = {
  name: 'App with default env variables',
  appVersion: '{{env.APP_VERSION "1.0.0"}}',
  engineVersion: '{{env.ENGINE_VERSION "1.0.0"}}',
}
