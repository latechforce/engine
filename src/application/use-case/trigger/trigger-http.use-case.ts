import type { Automation } from '@/domain/entity/automation.entity'
import { PlayingRun } from '@/domain/entity/run/playing-run.entity'
import type { IAutomationRepository } from '@/domain/repository-interface/automation-repository.interface'
import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import TYPES from '@/infrastructure/di/types'
import { inject, injectable } from 'inversify'

@injectable()
export class TriggerHttpUseCase {
  constructor(
    @inject(TYPES.Repository.Automation)
    private readonly automationRepository: IAutomationRepository,
    @inject(TYPES.Repository.Run)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(
    automation: Automation,
    request: Request
  ): Promise<{ data?: object; error?: string }> {
    const { schema } = automation.trigger
    const triggerData: {
      url: string
      method: string
      headers: Headers
      body?: object
    } = {
      url: request.url,
      method: request.method,
      headers: request.headers,
    }
    if (schema.event === 'post') {
      triggerData.body = request.body ? await request.json() : undefined
      if (
        schema.requestBody &&
        !this.automationRepository.validateTriggerData(schema.requestBody, triggerData.body)
      ) {
        return { error: 'Invalid body' }
      }
    }
    const run = new PlayingRun(automation.schema, { trigger: triggerData })
    await this.runRepository.create(run)
    if (schema.service === 'http' && schema.respondImmediately) {
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
