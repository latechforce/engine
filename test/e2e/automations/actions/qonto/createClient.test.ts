// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { test, expect, env, NodeApp } from '@test/fixtures'
import { type Config } from '@latechforce/engine'

test('should create a client', async ({ request }) => {
  // GIVEN
  const config: Config = {
    name: 'App',
    automations: [
      {
        name: 'createClient',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'create-client',
          output: {
            id: '{{createClient.id}}',
          },
        },
        actions: [
          {
            name: 'createClient',
            integration: 'Qonto',
            action: 'CreateClient',
            client: {
              name: 'John Doe',
              type: 'company',
              email: 'test@test.com',
              vat_number: 'FR12345678901',
              currency: 'EUR',
              locale: 'FR',
              address: '1 rue de Paris',
              city: 'Paris',
              zip_code: '75001',
              country_code: 'FR',
            },
          },
        ],
      },
    ],
    integrations: {
      qonto: {
        environment: 'sandbox',
        organisationSlug: env.TEST_QONTO_ORGANISATION_SLUG,
        secretKey: env.TEST_QONTO_SECRET_KEY,
        stagingToken: env.TEST_QONTO_STAGING_TOKEN,
      },
    },
  }
  const app = new NodeApp()
  const { url } = await app.start(config)

  // WHEN
  const response = await request
    .post(`${url}/api/automation/create-client`)
    .then((res) => res.json())

  // THEN
  expect(response.id).toBeDefined()
})
