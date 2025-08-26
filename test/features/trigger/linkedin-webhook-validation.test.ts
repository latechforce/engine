import { describe, expect, it, beforeEach } from 'bun:test'
import { TriggerHttpAutomationUseCase } from '../../../src/features/trigger/application/use-case/trigger-http-automation.use-case'
import { App } from '../../../src/features/app/domain/entity/app.entity'
import type { AppSchema } from '../../../src/types'

describe('LinkedIn Webhook Validation', () => {
  let useCase: TriggerHttpAutomationUseCase
  let app: App

  beforeEach(() => {
    // Create mock repositories
    const mockTriggerRepository = {
      log: {
        http: () => {},
      },
      validateData: () => true,
    }

    const mockRunRepository = {
      create: async (run: any) => {
        run.id = Math.floor(Math.random() * 10000)
        return run
      },
      onUpdate: (_callback: any) => {
        // Don't set up callback for GET requests - they complete immediately
      },
    }

    const mockObjectRepository = {
      create: async () => {},
    }

    const mockAutomationRepository = {
      status: {
        get: async () => ({ active: true }),
      },
    }

    useCase = new TriggerHttpAutomationUseCase(
      mockTriggerRepository as any,
      mockRunRepository as any,
      mockObjectRepository as any,
      mockAutomationRepository as any
    )
  })

  it('should respond with challengeCode and challengeResponse for LinkedIn GET webhook validation', async () => {
    // GIVEN - LinkedIn automation
    const appSchema: AppSchema = {
      name: 'Test App',
      buckets: [],
      connections: [],
      tables: [],
      forms: [],
      pages: [],
      automations: [
        {
          id: 1,
          name: 'linkedin-webhook',
          trigger: {
            service: 'linkedin-ads',
            event: 'new-lead-gen-form-response',
            params: {
              organizationId: '123456',
            },
          },
          actions: [],
        },
      ],
    }
    app = new App(appSchema)

    const challengeCode = 'test-challenge-abc123'
    const request = new Request(
      `http://localhost/api/automations/1/trigger?challengeCode=${challengeCode}`,
      {
        method: 'GET',
      }
    )

    const body = {}

    // WHEN
    const response = await useCase.execute(app, '1', request, body)

    // THEN
    expect(response.body).toHaveProperty('challengeCode', challengeCode)
    expect(response.body).toHaveProperty('challengeResponse') // Should be HMAC but for now just echo
    expect(response.headers?.['Content-Type']).toBe('application/json')
  })

  it('should respond with challengeCode for HTTP webhook GET validation', async () => {
    // GIVEN - HTTP automation that LinkedIn uses
    const appSchema: AppSchema = {
      name: 'Test App',
      buckets: [],
      connections: [],
      tables: [],
      forms: [],
      pages: [],
      automations: [
        {
          id: 2,
          name: 'http-webhook',
          trigger: {
            service: 'http',
            event: 'post',
            params: {
              path: '/webhook',
            },
          },
          actions: [],
        },
      ],
    }
    app = new App(appSchema)

    const challengeCode = 'http-challenge-xyz789'
    const request = new Request(
      `http://localhost/api/automations/webhook?challengeCode=${challengeCode}`,
      {
        method: 'GET',
      }
    )

    const body = {}

    // WHEN
    const response = await useCase.execute(app, 'webhook', request, body)

    // THEN
    expect(response.body).toHaveProperty('challengeCode', challengeCode)
    expect(response.body).toHaveProperty('challengeResponse')
    expect(response.headers?.['Content-Type']).toBe('application/json')
  })

  it('should process normal POST request when no challengeCode is present', async () => {
    // GIVEN
    const appSchema: AppSchema = {
      name: 'Test App',
      buckets: [],
      connections: [],
      tables: [],
      forms: [],
      pages: [],
      automations: [
        {
          id: 3,
          name: 'linkedin-webhook',
          trigger: {
            service: 'linkedin-ads',
            event: 'new-lead-gen-form-response',
            params: {
              organizationId: '123456',
            },
          },
          actions: [],
        },
      ],
    }
    app = new App(appSchema)

    const request = new Request('http://localhost/api/automations/3/trigger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const leadData = {
      leadType: 'SPONSORED',
      formResponse: {
        id: 'urn:li:leadFormResponse:123456',
      },
    }

    // WHEN
    const response = await useCase.execute(app, '3', request, leadData)

    // THEN
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('runId')
    expect(response.body).not.toHaveProperty('challengeCode')
  })

  it('should handle normal GET request without challengeCode', async () => {
    // GIVEN
    const appSchema: AppSchema = {
      name: 'Test App',
      buckets: [],
      connections: [],
      tables: [],
      forms: [],
      pages: [],
      automations: [
        {
          id: 4,
          name: 'http-get-webhook',
          trigger: {
            service: 'http',
            event: 'get',
            params: {
              path: '/webhook',
            },
          },
          actions: [],
        },
      ],
    }
    app = new App(appSchema)

    const request = new Request('http://localhost/api/automations/webhook', {
      method: 'GET',
    })

    const body = {}

    // WHEN
    const response = await useCase.execute(app, 'webhook', request, body)

    // THEN
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).not.toHaveProperty('challengeCode')
  })
})
