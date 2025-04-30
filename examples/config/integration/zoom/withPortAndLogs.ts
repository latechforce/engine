import type { Config } from '/src'

export const configIntegrationZoomWithPort: Config = {
  name: 'App with Zoom integration with port',
  integrations: {
    zoom: [
      {
        account: 'zoom_account',
        clientId: '{{ env.TEST_ZOOM_CLIENT_ID }}',
        clientSecret: '{{ env.TEST_ZOOM_CLIENT_SECRET }}',
        authBaseUrl: '{{ env.TEST_ZOOM_AUTH_BASE_URL }}',
        baseUrl: '{{ env.TEST_ZOOM_BASE_URL }}',
      },
    ],
  },
  services: {
    server: {
      port: 3000,
    },
    loggers: [
      {
        type: 'Console',
        level: 'debug',
      },
    ],
    database: {
      type: 'SQLite',
      url: 'database.sqlite',
    },
  },
}
