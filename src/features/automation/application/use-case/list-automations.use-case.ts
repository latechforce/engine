import { injectable } from 'inversify'
import type { App } from '@/app/domain/entity/app.entity'
import {
  toListAutomationsDto,
  type ListAutomationsDto,
} from '@/automation/application/dto/list-automations.dto'

@injectable()
export class ListAutomationsUseCase {
  constructor() {}

  async execute(app: App): Promise<ListAutomationsDto> {
    return toListAutomationsDto(app.automations)
  }
}
