import type { Config } from '@latechforce/engine'
import App from '@latechforce/engine/bun'

const config: Config = {
  name: 'My App',
  version: '1.0.0',
  engine: 'latest',
  forms: [
    {
      name: 'email_form',
      path: '/email',
      table: 'mailing_list',
      title: 'Email Form',
      inputs: [{ field: 'email', label: 'Email' }],
    },
  ],
  tables: [
    {
      name: 'mailing_list',
      fields: [{ name: 'email', type: 'Email' }],
    },
  ],
}

const { url } = await new App().start(config)
console.log(`Form is available at ${url}/form/email`)
