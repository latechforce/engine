import { injectable } from 'inversify'
import type { App } from '@/app/domain/entity/app.entity'
import { toListTableDto, type ListTablesDto } from '../dto/list-table.dto'

@injectable()
export class ListTablesUseCase {
  constructor() {}

  async execute(app: App): Promise<ListTablesDto> {
    return toListTableDto(app.tables)
  }
}
