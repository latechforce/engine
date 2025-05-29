import { injectable } from 'inversify'
import type { App } from '@/domain/entity/app.entity'
import {
  toListAutomationsDto,
  type ListAutomationsDto,
} from '@/application/dto/automation/list-automation.dto'

@injectable()
export class ListAutomationsUseCase {
  constructor() {}

  async execute(app: App): Promise<ListAutomationsDto> {
    return toListAutomationsDto(app.automations)
  }
}
