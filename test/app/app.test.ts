import { describe, it, expect } from 'bun:test'
import App, { type AppSchema } from '@/app'

describe('start', () => {
  it('should throw an error if there are unrecognized keys', async () => {
    // WHEN
    const call = () => new App().start({ invalid: 'schema' })

    // THEN
    expect(call).toThrow('Invalid app schema')
  })

  it('should throw an error if there is no env variable for connection', async () => {
    const schema: AppSchema = {
      connections: [
        {
          id: 1,
          name: 'connection',
          service: 'calendly',
          clientId: '{{env "CLIENT_ID"}}',
          clientSecret: '{{env "CLIENT_SECRET"}}',
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Environment variable "CLIENT_ID" is not set')
  })

  it('should throw an error if there are duplicate automation names', async () => {
    const schema: AppSchema = {
      automations: [
        {
          id: 1,
          name: 'automation',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [],
        },
        {
          id: 2,
          name: 'automation',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate automation name: automation')
  })

  it('should throw an error if there are duplicate connection names', async () => {
    const schema: AppSchema = {
      connections: [
        {
          id: 1,
          name: 'connection',
          service: 'calendly',
          clientId: 'clientId',
          clientSecret: 'clientSecret',
        },
        {
          id: 2,
          name: 'connection',
          service: 'calendly',
          clientId: 'clientId',
          clientSecret: 'clientSecret',
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate connection name: connection')
  })

  it('should throw an error if there are duplicate connection ids', async () => {
    const schema: AppSchema = {
      connections: [
        {
          id: 1,
          name: 'connection-1',
          service: 'calendly',
          clientId: 'clientId',
          clientSecret: 'clientSecret',
        },
        {
          id: 1,
          name: 'connection-2',
          service: 'calendly',
          clientId: 'clientId',
          clientSecret: 'clientSecret',
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate connection id: 1')
  })

  it('should throw an error if there are duplicate table names', async () => {
    const schema: AppSchema = {
      tables: [
        {
          id: 1,
          name: 'table',
          fields: [],
        },
        {
          id: 2,
          name: 'table',
          fields: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate table name: table')
  })

  it('should throw an error if there are duplicate table ids', async () => {
    const schema: AppSchema = {
      tables: [
        {
          id: 1,
          name: 'table-1',
          fields: [],
        },
        {
          id: 1,
          name: 'table-2',
          fields: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate table id: 1')
  })

  it('should throw an error if there are duplicate form names', async () => {
    const schema: AppSchema = {
      forms: [
        {
          id: 1,
          name: 'form',
          path: '/form-1',
          action: 'submit',
          inputs: [],
        },
        {
          id: 2,
          name: 'form',
          path: '/form-2',
          action: 'submit',
          inputs: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate form name: form')
  })

  it('should throw an error if there are duplicate form ids', async () => {
    const schema: AppSchema = {
      forms: [
        {
          id: 1,
          name: 'form 1',
          path: '/form-1',
          action: 'submit',
          inputs: [],
        },
        {
          id: 1,
          name: 'form 2',
          path: '/form-2',
          action: 'submit',
          inputs: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate form id: 1')
  })

  it('should throw an error if there are duplicate form paths', async () => {
    const schema: AppSchema = {
      forms: [
        {
          id: 1,
          name: 'form 1',
          path: '/form',
          action: 'submit',
          inputs: [],
        },
        {
          id: 2,
          name: 'form 2',
          path: '/form',
          action: 'submit',
          inputs: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate form path: /form')
  })

  it('should throw an error if there are duplicate trigger paths', async () => {
    const schema: AppSchema = {
      automations: [
        {
          id: 1,
          name: 'automation-1',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [],
        },
        {
          id: 2,
          name: 'automation-2',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate trigger path: /automation')
  })

  it('should throw an error if there are duplicate field names', async () => {
    const schema: AppSchema = {
      tables: [
        {
          id: 1,
          name: 'table',
          fields: [
            {
              id: 1,
              name: 'field',
              type: 'single-line-text',
            },
            {
              id: 2,
              name: 'field',
              type: 'single-line-text',
            },
          ],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate field name: field')
  })

  it('should throw an error if there are duplicate field ids', async () => {
    const schema: AppSchema = {
      tables: [
        {
          id: 1,
          name: 'table',
          fields: [
            {
              id: 1,
              name: 'field-1',
              type: 'single-line-text',
            },
            {
              id: 1,
              name: 'field-2',
              type: 'single-line-text',
            },
          ],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate field id: 1')
  })

  it('should throw an error if there are duplicate action names', async () => {
    const schema: AppSchema = {
      automations: [
        {
          id: 1,
          name: 'automation',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [
            {
              name: 'action',
              service: 'code',
              action: 'run-javascript',
              params: {
                code: 'console.log("action")',
              },
            },
            {
              name: 'action',
              service: 'code',
              action: 'run-javascript',
              params: {
                code: 'console.log("action")',
              },
            },
          ],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate action name: action')
  })

  it('should throw an error if there are duplicate path names', async () => {
    const schema: AppSchema = {
      automations: [
        {
          id: 1,
          name: 'automation',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [
            {
              name: 'action',
              service: 'filter',
              action: 'split-into-paths',
              params: [
                {
                  name: 'path',
                  filter: {
                    or: [],
                  },
                  actions: [],
                },
                {
                  name: 'path',
                  filter: {
                    or: [],
                  },
                  actions: [],
                },
              ],
            },
          ],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate path name: path')
  })

  it('should throw an error if there are duplicate automation ids', async () => {
    const schema: AppSchema = {
      automations: [
        {
          id: 1,
          name: 'automation-1',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [],
        },
        {
          id: 1,
          name: 'automation-2',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate automation id: 1')
  })

  it('should throw an error if there are duplicate bucket names', async () => {
    const schema: AppSchema = {
      buckets: [
        {
          id: 1,
          name: 'bucket',
        },
        {
          id: 2,
          name: 'bucket',
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate bucket name: bucket')
  })

  it('should throw an error if there are duplicate bucket ids', async () => {
    const schema: AppSchema = {
      buckets: [
        {
          id: 1,
          name: 'bucket',
        },
        {
          id: 1,
          name: 'bucket 2',
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Duplicate bucket id: 1')
  })

  it('should throw an error if there is no primary field', async () => {
    const schema: AppSchema = {
      tables: [
        {
          id: 1,
          name: 'table',
          fields: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Table must have at least one field')
  })

  it('should throw an error if the primary field is not a single-line-text, long-text, url, email or phone-number field', async () => {
    const schema: AppSchema = {
      tables: [
        {
          id: 1,
          name: 'table',
          fields: [
            {
              id: 1,
              name: 'field',
              type: 'checkbox',
            },
          ],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow(
      'Table must have a single-line-text, long-text, url, email or phone-number field as primary field'
    )
  })

  it('should throw an error if a trigger account is not found', async () => {
    const schema: AppSchema = {
      automations: [
        {
          id: 1,
          name: 'automation-1',
          trigger: {
            account: 'airtable',
            service: 'airtable',
            event: 'record-created',
            params: {
              baseId: 'baseId',
              tableId: 'tableId',
            },
          },
          actions: [],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Account "airtable" not found for trigger "airtable/record-created"')
  })

  it('should throw an error if a action account is not found', async () => {
    const schema: AppSchema = {
      automations: [
        {
          id: 1,
          name: 'automation-1',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/automation',
            },
          },
          actions: [
            {
              name: 'action',
              service: 'airtable',
              action: 'list-webhook-payloads',
              account: 'airtable',
              params: {
                baseId: 'baseId',
                webhookId: 'webhookId',
              },
            },
          ],
        },
      ],
    }

    // WHEN
    const call = () => new App().start(schema)

    // THEN
    expect(call).toThrow('Account "airtable" not found for action "airtable/list-webhook-payloads"')
  })
})
