import type { Config } from '/src'

export const configIntegrationYoucanbookme: Config = {
  name: 'App with Youcanbookme integration',
  integrations: {
    youcanbookme: [
      {
        account: 'youcanbookme_account',
        user: {
          username: 'youcanbookme_user_username',
          password: 'youcanbookme_user_password',
        },
      },
    ],
  },
}
