import { injectable } from 'inversify'
import { toAutomationDto, type AutomationDto } from '@/application/dto/automation.dto'
import type { App } from '@/domain/entity/app.entity'

@injectable()
export class ListAutomationsUseCase {
  constructor() {}

  async execute(app: App): Promise<AutomationDto[]> {
    return app.automations.map(toAutomationDto)
  }
}
