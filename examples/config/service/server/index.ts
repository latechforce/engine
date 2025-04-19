import type { Config } from '/src'

export const configServiceServer: Config = {
  name: 'App with a server',
  services: {
    server: {
      port: 3000,
      baseUrl: 'https://app.example.com',
    },
  },
}
