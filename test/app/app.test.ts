import { describe, it, expect } from 'bun:test'
import App, { type AppSchema } from '@/app'

describe('start', () => {
  it('should throw an error if there are unrecognized keys', async () => {
    // WHEN
    const call = () => new App().start({ invalid: 'schema' })

    // THEN
    expect(call).toThrow('Invalid app schema')
  })

  it('should throw an error if there are duplicate automation names', async () => {
    const schema: AppSchema = {
      automations: [
        {
          name: 'automation',
          trigger: {
            service: 'http',
            event: 'post',
            path: '/automation',
          },
          actions: [],
        },
        {
          name: 'automation',
          trigger: {
            service: 'http',
            event: 'post',
            path: '/automation',
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
          name: 'form',
          path: '/form',
          action: 'submit',
          inputs: [],
        },
        {
          name: 'form',
          path: '/form',
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

  it('should throw an error if there are duplicate trigger paths', async () => {
    const schema: AppSchema = {
      automations: [
        {
          name: 'automation-1',
          trigger: {
            service: 'http',
            event: 'post',
            path: '/automation',
          },
          actions: [],
        },
        {
          name: 'automation-2',
          trigger: {
            service: 'http',
            event: 'post',
            path: '/automation',
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
          name: 'automation',
          trigger: {
            service: 'http',
            event: 'post',
            path: '/automation',
          },
          actions: [
            {
              name: 'action',
              service: 'code',
              action: 'run-javascript',
              code: 'console.log("action")',
            },
            {
              name: 'action',
              service: 'code',
              action: 'run-javascript',
              code: 'console.log("action")',
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
})
