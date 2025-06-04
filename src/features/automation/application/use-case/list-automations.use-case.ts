// Third-party imports
import { injectable } from 'inversify'

// App domain imports
import type { App } from '../../../../features/app/domain/entity/app.entity'

// Automation application imports
import { toListAutomationsDto, type ListAutomationsDto } from '../dto/list-automations.dto'

@injectable()
export class ListAutomationsUseCase {
  constructor() {}

  async execute(app: App): Promise<ListAutomationsDto> {
    return toListAutomationsDto(app.automations)
  }
}
