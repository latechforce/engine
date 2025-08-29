import { describe, expect, it, beforeEach } from 'bun:test'
import { TriggerHttpAutomationUseCase } from '../../../src/features/trigger/application/use-case/trigger-http-automation.use-case'
import { App } from '../../../src/features/app/domain/entity/app.entity'
import type { AppSchema } from '../../../src/types'
import type { AppSchemaValidated } from '../../../src/features/app/domain/schema/app.schema'
import type { Env } from '../../../src/shared/domain/value-object/env.value-object'
import { createHmac } from 'crypto'

describe('LinkedIn Webhook Validation', () => {
  let useCase: TriggerHttpAutomationUseCase
  let app: App
  const mockEnv: Env = {
    NODE_ENV: 'test',
    PORT: '3000',
    BASE_URL: 'http://localhost:3000',
    TIMEZONE: 'UTC',
    LOG_LEVEL: 'silent',
    DATABASE_PROVIDER: 'sqlite',
    DATABASE_URL: ':memory:',
    AUTH_ADMIN_EMAIL: 'admin@test.com',
    AUTH_ADMIN_PASSWORD: 'password',
    AUTH_ADMIN_NAME: 'Test Admin',
    AUTH_SECRET: 'test-secret',
    RESEND_EMAIL_FROM: 'noreply@test.com',
    SUPPORT_EMAILS: 'support@test.com',
  }

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
        const mockRun = { ...run, id: Math.floor(Math.random() * 10000), status: 'success' }
        // Immediately trigger completion for tests
        setTimeout(() => {
          if (mockRunRepository.updateCallback) {
            mockRunRepository.updateCallback(mockRun)
          }
        }, 1)
        return mockRun
      },
      onUpdate: (callback: any) => {
        mockRunRepository.updateCallback = callback
      },
      updateCallback: null as any,
      replay: async (_runIds: string[]) => {
        return { replayed: [] }
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
    // GIVEN - LinkedIn automation with proper connection
    const clientSecret = 'test-client-secret'
    const appSchema: AppSchema = {
      name: 'Test App',
      version: '1.0.0',
      description: 'Test app',
      buckets: [],
      connections: [
        {
          id: 123456,
          service: 'linkedin-ads',
          name: 'LinkedIn Test Connection',
          clientId: 'test-client-id',
          clientSecret,
        },
      ],
      tables: [],
      forms: [],
      automations: [
        {
          id: 1,
          name: 'linkedin-webhook',
          trigger: {
            account: 123456,
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
    app = new App(appSchema as AppSchemaValidated, mockEnv)

    const challengeCode = 'test-challenge-abc123'
    const expectedChallengeResponse = createHmac('sha256', clientSecret)
      .update(challengeCode)
      .digest('hex')

    const request = new Request(
      `http://localhost/api/automations/1/trigger?challengeCode=${challengeCode}`,
      {
        method: 'GET',
      }
    )

    const body = {}

    // WHEN
    const response = await useCase.execute(app, '1', request, body, undefined)

    // THEN
    expect(response.body).toHaveProperty('challengeCode', challengeCode)
    expect(response.body).toHaveProperty('challengeResponse', expectedChallengeResponse)
    expect(response.headers?.['Content-Type']).toBe('application/json')
  })

  it('should respond with challengeCode for HTTP webhook GET validation', async () => {
    // GIVEN - HTTP automation that LinkedIn uses
    const appSchema: AppSchema = {
      name: 'Test App',
      version: '1.0.0',
      description: 'Test app',
      buckets: [],
      connections: [],
      tables: [],
      forms: [],
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
    app = new App(appSchema as AppSchemaValidated, mockEnv)

    const challengeCode = 'http-challenge-xyz789'
    const request = new Request(
      `http://localhost/api/automations/webhook?challengeCode=${challengeCode}`,
      {
        method: 'GET',
      }
    )

    const body = {}

    // WHEN
    const response = await useCase.execute(app, 'webhook', request, body, undefined)

    // THEN
    expect(response.body).toHaveProperty('challengeCode', challengeCode)
    expect(response.body).toHaveProperty('challengeResponse')
    expect(response.headers?.['Content-Type']).toBe('application/json')
  })

  it('should process normal POST request when no challengeCode is present', async () => {
    // GIVEN
    const appSchema: AppSchema = {
      name: 'Test App',
      version: '1.0.0',
      description: 'Test app',
      buckets: [],
      connections: [
        {
          id: 123456,
          service: 'linkedin-ads',
          name: 'LinkedIn Test Connection',
          clientId: 'test-client-id',
          clientSecret: 'test-client-secret',
        },
      ],
      tables: [],
      forms: [],
      automations: [
        {
          id: 3,
          name: 'linkedin-webhook',
          trigger: {
            account: 123456,
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
    app = new App(appSchema as AppSchemaValidated, mockEnv)

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
    const response = await useCase.execute(app, '3', request, leadData, undefined)

    // THEN
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('runId')
    expect(response.body).not.toHaveProperty('challengeCode')
  })

  it('should handle LinkedIn validation with applicationId parameter', async () => {
    // GIVEN - LinkedIn validation with applicationId for parent-child apps
    const clientId = 'test-application-id'
    const clientSecret = 'parent-app-secret'
    const appSchema: AppSchema = {
      name: 'Test App',
      version: '1.0.0',
      description: 'Test app',
      buckets: [],
      connections: [
        {
          id: 789012,
          service: 'linkedin-ads',
          name: 'LinkedIn Parent App Connection',
          clientId,
          clientSecret,
        },
      ],
      tables: [],
      forms: [],
      automations: [
        {
          id: 5,
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
    app = new App(appSchema as AppSchemaValidated, mockEnv)

    const challengeCode = 'parent-app-challenge-xyz'
    const expectedChallengeResponse = createHmac('sha256', clientSecret)
      .update(challengeCode)
      .digest('hex')

    const request = new Request(
      `http://localhost/api/automations/webhook?challengeCode=${challengeCode}&applicationId=${clientId}`,
      {
        method: 'GET',
      }
    )

    const body = {}

    // WHEN
    const response = await useCase.execute(app, 'webhook', request, body, undefined)

    // THEN
    expect(response.body).toHaveProperty('challengeCode', challengeCode)
    expect(response.body).toHaveProperty('challengeResponse', expectedChallengeResponse)
    expect(response.headers?.['Content-Type']).toBe('application/json')
  })

  it('should handle normal GET request without challengeCode', async () => {
    // GIVEN
    const appSchema: AppSchema = {
      name: 'Test App',
      version: '1.0.0',
      description: 'Test app',
      buckets: [],
      connections: [],
      tables: [],
      forms: [],
      automations: [
        {
          id: 4,
          name: 'http-get-webhook',
          trigger: {
            service: 'http',
            event: 'get',
            params: {
              path: '/webhook',
              respondImmediately: true,
            },
          },
          actions: [],
        },
      ],
    }
    app = new App(appSchema as AppSchemaValidated, mockEnv)

    const request = new Request('http://localhost/api/automations/webhook', {
      method: 'GET',
    })

    const body = {}

    // WHEN
    const response = await useCase.execute(app, 'webhook', request, body, undefined)

    // THEN
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).not.toHaveProperty('challengeCode')
  })
})
