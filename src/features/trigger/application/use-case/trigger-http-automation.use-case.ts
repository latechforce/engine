// Third-party imports
import { inject, injectable } from 'inversify'

// Shared imports
import TYPES from '../../../../shared/application/di/types'

// Run domain imports
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

@injectable()
export class TriggerHttpAutomationUseCase {
  constructor(
    @inject(TYPES.Trigger.Repository)
    private readonly triggerRepository: ITriggerRepository,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Bucket.Repository.Object)
    private readonly objectRepository: IObjectRepository,
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(
    app: App,
    paramPath: string,
    request: Request,
    body: Record<string, unknown>
  ): Promise<ResponseDto> {
    const automation = app.automations.find(({ trigger }) => {
      if (trigger.path === paramPath) {
        if (trigger.schema.service === 'http') {
          return request.method.toLowerCase() === trigger.schema.event.toLowerCase()
        }
        return true
      }
      return false
    })
    if (!automation) throw new TriggerError('Automation not found', 404)
    const status = await this.automationRepository.status.get(automation.schema.id)
    if (!status) throw new TriggerError('Automation status not found', 404)
    const { schema } = automation.trigger
    let initRun: Run | undefined
    if (status.active) {
      const objects: ObjectEntity[] = []
      let trigger: Record<string, unknown> = {}
      if (schema.service === 'http') {
        trigger.url = request.url
        trigger.method = request.method
        trigger.headers = request.headers
        if (schema.event === 'post') {
          const contentType = request.headers.get('content-type') || ''
          if (contentType.includes('application/json')) {
            trigger.body = body
            this.triggerRepository.http('body', trigger.body)
          } else if (
            contentType.includes('application/x-www-form-urlencoded') ||
            contentType.includes('multipart/form-data')
          ) {
            const formName = request.headers.get('x-form-name') || ''
            const form = app.findForm(formName)
            const formData = body
            this.triggerRepository.http('formData', formData)
            const fields: Fields = {}
            for (const key of Object.keys(body)) {
              const value = body[key]
              switch (form?.findInput(key)?.type) {
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
            trigger.body = fields
          }
          if (
            schema.requestBody &&
            !this.triggerRepository.validateData(schema.requestBody, trigger.body)
          ) {
            throw new TriggerError('Invalid body', 400)
          }
        }
      } else if (request.method === 'POST') {
        const contentType = request.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          trigger = body
          this.triggerRepository.http('body', trigger)
        } else if (
          contentType.includes('application/x-www-form-urlencoded') ||
          contentType.includes('multipart/form-data')
        ) {
          this.triggerRepository.http('formData', body)
          const fields: Fields = {}
          for (const key of Object.keys(body)) {
            const value = body[key]
            if (value instanceof File) {
              throw new HttpError('Invalid attachment', 400)
            }
            fields[key] = String(value)
          }
          trigger = fields
        }
      }
      for (const object of objects) {
        await this.objectRepository.create(object)
      }
      initRun = new Run(automation.schema, { trigger })
      await this.runRepository.create(initRun)
    }
    if ((schema.service === 'http' && schema.respondImmediately) || schema.service !== 'http') {
      return { success: true, runId: initRun?.id }
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
            case 'playing':
              if (run.lastActionName === responseActionSchema?.name) {
                if (responseActionSchema.body) {
                  const response = this.triggerRepository.fillTemplateObject(
                    responseActionSchema.body,
                    run.data
                  )
                  resolve({ data: response, ...successResponse })
                } else {
                  resolve(successResponse)
                }
              }
              break
            case 'stopped':
              reject(new TriggerError(run.errorMessage || 'Unknown error', 500))
              break
            case 'success':
              if (run.lastActionName) {
                resolve({ data: run.getLastActionData(), ...successResponse })
              } else {
                resolve(successResponse)
              }
              break
            case 'filtered':
              resolve({ data: { canContinue: false }, ...successResponse })
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
