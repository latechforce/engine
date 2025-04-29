import { Encryption } from '@adonisjs/encryption'

export default {
  appKey: 'your-app-key',
  http: {
    cookie: {
      maxAge: '2h',
    },
    trustProxy: true,
  },
  server: {
    port: 3000,
  },
  encryption: {
    secret: 'your-encryption-secret',
  },
}
