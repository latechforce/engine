// Third-party imports
import { inject, injectable } from 'inversify'

// Shared imports
import TYPES from '@/shared/application/di/types'

// Automation domain imports
import type { Automation } from '@/automation/domain/entity/automation.entity'
import type { IAutomationRepository } from '@/automation/domain/repository-interface/automation-repository.interface'

// Run domain imports
import { PlayingRun } from '@/run/domain/entity/playing-run.entity'
import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'

@injectable()
export class HttpTriggeredUseCase {
  constructor(
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(
    automation: Automation,
    request: Request
  ): Promise<{ data?: object; error?: string }> {
    console.log('request', request)
    const { schema } = automation.trigger
    let trigger: Record<string, unknown> = {}
    if (schema.service === 'http') {
      trigger.url = request.url
      trigger.method = request.method
      trigger.headers = request.headers
      if (schema.event === 'post') {
        const contentType = request.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
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
          !this.automationRepository.validateTriggerData(schema.requestBody, trigger.body)
        ) {
          return { error: 'Invalid body' }
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
      return {}
    }
    const responseActionSchema = automation.schema.actions.find(
      (s) => s.service === 'http' && s.action === 'response'
    )
    return new Promise((resolve) => {
      this.runRepository.onUpdate(async (run) => {
        switch (run.status) {
          case 'playing':
            if (run.lastActionName === responseActionSchema?.name) {
              if (responseActionSchema.body) {
                const response = this.automationRepository.fillTemplateObject(
                  responseActionSchema.body,
                  run.data
                )
                resolve({ data: response })
              } else {
                resolve({})
              }
            }
            break
          case 'stopped':
            resolve({ error: run.errorMessage })
            break
          case 'success':
            if (run.lastActionName) {
              resolve({ data: run.getLastActionData() })
            } else {
              resolve({})
            }
            break
        }
      })
    })
  }
}
