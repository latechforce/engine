import { Run } from '../../../../features/run/domain/entity/run.entity'
import type { IRunRepository } from '../../../../features/run/domain/repository-interface/run-repository.interface'
import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { ResponseDto } from '../dto/response.dto'
import { TriggerError } from '../../domain/entity/trigger-error.entity'
import type { Fields } from '../../../../features/table/domain/object-value/fields.object-value'
import { Object as ObjectEntity } from '../../../../features/bucket/domain/entity/object.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { IObjectRepository } from '../../../../features/bucket/domain/repository-interface/object-repository.interface'
import type { IAutomationRepository } from '../../../../features/automation/domain/repository-interface/automation-repository.interface'
import { createHmac } from 'crypto'

export class TriggerHttpAutomationUseCase {
  constructor(
    private readonly triggerRepository: ITriggerRepository,

    private readonly runRepository: IRunRepository,

    private readonly objectRepository: IObjectRepository,

    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(
    app: App,
    automationIdOrPath: string,
    request: Request,
    body: Record<string, unknown> | Record<string, unknown>[],
    formId?: string
  ): Promise<ResponseDto> {
    // Handle webhook validation GET requests
    if (request.method === 'GET') {
      const url = new URL(request.url)

      // LinkedIn webhook validation
      const challengeCode = url.searchParams.get('challengeCode')
      const applicationId = url.searchParams.get('applicationId')

      if (challengeCode) {
        // Get the automation to find the LinkedIn connection and client secret
        const automation = app.automations.find(({ schema }) => {
          if (schema.id === Number(automationIdOrPath)) return true
          if (schema.trigger.service === 'http') {
            if (schema.trigger.event === 'post' && request.method === 'POST') {
              return schema.trigger.params.path.replace(/^\//, '') === automationIdOrPath
            } else if (schema.trigger.event === 'get' && request.method === 'GET') {
              return schema.trigger.params.path.replace(/^\//, '') === automationIdOrPath
            }
          }
          return false
        })

        let challengeResponse = challengeCode // Default fallback

        // If we have a LinkedIn automation with a connection, compute proper HMAC
        if (
          automation?.schema.trigger.service === 'linkedin-ads' &&
          'account' in automation.schema.trigger &&
          automation.schema.trigger.account
        ) {
          const linkedinTrigger = automation.schema.trigger
          const connection = app.connections.find((conn) => conn.id === linkedinTrigger.account)
          if (connection?.clientSecret) {
            // Compute HMAC-SHA256(challengeCode, clientSecret) and return as hex
            challengeResponse = createHmac('sha256', connection.clientSecret)
              .update(challengeCode)
              .digest('hex')
          }
        } else if (applicationId) {
          // Handle parent-child application scenario - look for connection by applicationId
          const connection = app.connections.find(
            (conn) => conn.service === 'linkedin-ads' && conn.clientId === applicationId
          )
          if (connection?.clientSecret) {
            challengeResponse = createHmac('sha256', connection.clientSecret)
              .update(challengeCode)
              .digest('hex')
          }
        }

        return {
          body: {
            challengeCode,
            challengeResponse,
          },
          headers: { 'Content-Type': 'application/json' },
        }
      }

      // Facebook webhook validation
      const hubMode = url.searchParams.get('hub.mode')
      const hubChallenge = url.searchParams.get('hub.challenge')
      const hubVerifyToken = url.searchParams.get('hub.verify_token')

      if (hubMode === 'subscribe' && hubChallenge && hubVerifyToken) {
        // For Facebook, we need to verify the token matches
        // TODO: Verify hubVerifyToken matches the stored verify token for this automation
        // For now, return the challenge to complete validation
        // Facebook expects plain text response with just the challenge value
        // Using a special response format that will be handled by the HTTP layer
        return {
          body: hubChallenge, // Special format for plain text response
          headers: { 'Content-Type': 'text/plain' },
        }
      }

      // Handle non-subscribe webhook requests (e.g., hub.mode=unsubscribe)
      if (hubMode && hubChallenge && hubVerifyToken) {
        // When hub.mode is not 'subscribe', process as normal GET request
        return {
          body: { success: true },
          headers: { 'Content-Type': 'application/json' },
        }
      }
      // Process normal GET requests
      if (Array.isArray(body)) {
        // Handle array body for GET requests (similar to POST)
        const responses: ResponseDto['body'][] = []
        for (const item of body) {
          const { body: responseBody } = await this.triggerWithObjectBody(
            app,
            automationIdOrPath,
            request,
            item,
            formId
          )
          responses.push(responseBody)
        }
        return {
          body: {
            data: responses,
            success: true,
          },
        }
      }
      return this.triggerWithObjectBody(app, automationIdOrPath, request, body, formId)
    }
    if (Array.isArray(body)) {
      const responses: ResponseDto['body'][] = []
      for (const item of body) {
        const { body: responseBody } = await this.triggerWithObjectBody(
          app,
          automationIdOrPath,
          request,
          item,
          formId
        )
        responses.push(responseBody)
      }
      return {
        body: {
          data: responses,
          success: true,
        },
      }
    } else {
      return this.triggerWithObjectBody(app, automationIdOrPath, request, body, formId)
    }
  }

  async triggerWithObjectBody(
    app: App,
    automationIdOrPath: string,
    request: Request,
    body: Record<string, unknown>,
    formId?: string
  ): Promise<ResponseDto> {
    const automation = app.automations.find(({ schema }) => {
      if (schema.id === Number(automationIdOrPath)) return true
      if (schema.trigger.service === 'http') {
        if (schema.trigger.event === 'post' && request.method === 'POST') {
          return schema.trigger.params.path.replace(/^\//, '') === automationIdOrPath
        } else if (schema.trigger.event === 'get' && request.method === 'GET') {
          return schema.trigger.params.path.replace(/^\//, '') === automationIdOrPath
        }
      }
      return false
    })
    if (!automation) throw new TriggerError('Automation not found', 404)
    const status = await this.automationRepository.status.get(automation.schema.id)
    if (!status) throw new TriggerError('Automation status not found', 404)
    const { trigger } = automation
    let initRun: Run | undefined
    if (status.active) {
      const objects: ObjectEntity[] = []
      let triggerData: Record<string, unknown> = {}
      if (trigger.service === 'http') {
        triggerData.url = request.url
        triggerData.method = request.method
        triggerData.headers = request.headers
        if (trigger.event === 'post') {
          const contentType = request.headers.get('content-type') || ''
          if (contentType.includes('application/json')) {
            triggerData.body = body
            this.triggerRepository.log.http('body', triggerData.body)
          } else if (
            contentType.includes('application/x-www-form-urlencoded') ||
            contentType.includes('multipart/form-data')
          ) {
            const fields: Fields = {}
            if (formId) {
              const form = app.findForm(formId)
              if (!form) throw new TriggerError('Form not found', 404)
              this.triggerRepository.log.http('formData', body)
              for (const key of Object.keys(body)) {
                const value = body[key]
                switch (form.findInput(key)?.type) {
                  case 'checkbox':
                    fields[key] = value === 'true'
                    break
                  case 'single-attachment':
                    if (value instanceof File) {
                      const data = await value.arrayBuffer()
                      const object = new ObjectEntity(
                        value.name,
                        0,
                        new Uint8Array(data),
                        value.type,
                        data.byteLength
                      )
                      objects.push(object)
                      fields[key] = object.key
                    } else {
                      throw new HttpError('Invalid attachment', 400)
                    }
                    break
                  default:
                    if (value instanceof File) {
                      throw new HttpError('Invalid attachment', 400)
                    }
                    fields[key] = String(value)
                }
              }
            } else {
              const formData = await request.formData()
              this.triggerRepository.log.http('formData', formData)
              for (const [key, value] of formData.entries()) {
                fields[key] = value
              }
            }
            triggerData.body = fields
          }
          if (
            trigger.params.requestBody &&
            !this.triggerRepository.validateData(trigger.params.requestBody, triggerData.body)
          ) {
            throw new TriggerError('Invalid body', 400)
          }
        }
      } else if (request.method === 'POST') {
        const contentType = request.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          triggerData = body
          this.triggerRepository.log.http('body', triggerData)
        } else if (
          contentType.includes('application/x-www-form-urlencoded') ||
          contentType.includes('multipart/form-data')
        ) {
          this.triggerRepository.log.http('formData', body)
          const fields: Fields = {}
          for (const key of Object.keys(body)) {
            const value = body[key]
            if (value instanceof File) {
              throw new HttpError('Invalid attachment', 400)
            }
            fields[key] = String(value)
          }
          triggerData = fields
        }
      }
      for (const object of objects) {
        await this.objectRepository.create(object)
      }
      initRun = new Run(
        automation.schema.id,
        [
          {
            type: 'trigger',
            schema: trigger,
            output: triggerData,
          },
        ],
        formId ? Number(formId) : undefined
      )
      await this.runRepository.create(initRun)
    }
    if (
      (trigger.event === 'post' && trigger.params?.respondImmediately) ||
      (trigger.event === 'get' && trigger.params?.respondImmediately) ||
      trigger.service !== 'http'
    ) {
      return { body: { success: true, runId: initRun?.id } }
    }
    if (!initRun) {
      throw new TriggerError('Automation is not active', 403)
    }
    const responseActionSchema = automation.schema.actions.find(
      (s) => s.service === 'http' && s.action === 'response'
    )
    return await new Promise((resolve, reject) => {
      this.runRepository.onUpdate(async (run) => {
        if (run.id === initRun.id) {
          const successResponse = { success: true, runId: run.id }
          switch (run.status) {
            case 'playing': {
              const lastAction = run.getLastActionStep()
              if (
                lastAction &&
                lastAction.schema.name === responseActionSchema?.name &&
                run.isStepExecuted(lastAction.schema.name)
              ) {
                const { body, headers } = run.getLastActionStepData()
                if (body) {
                  resolve({ body, headers: headers as Record<string, string> | undefined })
                } else {
                  resolve({ body: successResponse })
                }
              }
              break
            }
            case 'stopped': {
              reject(new TriggerError(run.getErrorMessage() || 'Unknown error in automation', 400))
              break
            }
            case 'success': {
              const lastAction = run.getLastActionStep()
              if (lastAction) {
                resolve({
                  body: { data: run.getLastActionStepData(), ...successResponse },
                })
              } else {
                resolve({ body: successResponse })
              }
              break
            }
            case 'filtered':
              resolve({ body: { data: run.getLastActionStepData(), ...successResponse } })
              break
            default: {
              const _exhaustiveCheck: never = run.status
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
        }
      })
    })
  }
}
