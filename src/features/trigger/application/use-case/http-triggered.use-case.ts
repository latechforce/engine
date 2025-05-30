// Third-party imports
import { inject, injectable } from 'inversify'

// Shared imports
import TYPES from '@/shared/application/di/types'

// Run domain imports
import { PlayingRun } from '@/run/domain/entity/playing-run.entity'
import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'
import type { ITriggerRepository } from '@/trigger/domain/repository-interface/trigger-repository.interface'
import type { App } from '@/app/domain/entity/app.entity'
import type { ResponseDto } from '../dto/response.dto'
import { TriggerError } from '@/trigger/domain/entity/trigger-error.entity'

@injectable()
export class HttpTriggeredUseCase {
  constructor(
    @inject(TYPES.Trigger.Repository)
    private readonly triggerRepository: ITriggerRepository,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(app: App, paramPath: string, request: Request): Promise<ResponseDto> {
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
    const { schema } = automation.trigger
    let trigger: Record<string, unknown> = {}
    if (schema.service === 'http') {
      trigger.url = request.url
      trigger.method = request.method
      trigger.headers = request.headers
      if (schema.event === 'post') {
        const contentType = request.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          console.log(request.body)
          trigger.body = request.body ? await request.json() : undefined
        } else if (
          contentType.includes('application/x-www-form-urlencoded') ||
          contentType.includes('multipart/form-data')
        ) {
          const formData = await request.formData()
          trigger.body = Object.fromEntries(Array.from(formData.entries()))
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
        trigger = request.body ? await request.json() : {}
      } else if (
        contentType.includes('application/x-www-form-urlencoded') ||
        contentType.includes('multipart/form-data')
      ) {
        const formData = await request.formData()
        trigger = Object.fromEntries(Array.from(formData.entries()))
      }
    }
    const run = new PlayingRun(automation.schema, { trigger })
    await this.runRepository.create(run)
    if ((schema.service === 'http' && schema.respondImmediately) || schema.service !== 'http') {
      return { success: true }
    }
    const responseActionSchema = automation.schema.actions.find(
      (s) => s.service === 'http' && s.action === 'response'
    )
    return await new Promise((resolve, reject) => {
      this.runRepository.onUpdate(async (run) => {
        switch (run.status) {
          case 'playing':
            if (run.lastActionName === responseActionSchema?.name) {
              if (responseActionSchema.body) {
                const response = this.triggerRepository.fillTemplateObject(
                  responseActionSchema.body,
                  run.data
                )
                resolve({ data: response, success: true })
              } else {
                resolve({ success: true })
              }
            }
            break
          case 'stopped':
            reject(new TriggerError(run.errorMessage, 500))
            break
          case 'success':
            if (run.lastActionName) {
              resolve({ data: run.getLastActionData(), success: true })
            } else {
              resolve({ success: true })
            }
            break
        }
      })
    })
  }
}
