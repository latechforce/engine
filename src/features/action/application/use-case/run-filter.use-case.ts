import type { IActionRepository } from '@/action/domain/repository-interface/action-repository.interface'
import type { ConditionsSchema } from '@/action/domain/schema/condition'
import type { FilterActionSchema } from '@/action/domain/schema/service/filter'
import type { PlayingRun } from '@/run/domain/entity/playing-run.entity'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'

@injectable()
export class RunFilterUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly actionRepository: IActionRepository
  ) {}

  async execute(schema: FilterActionSchema, run: PlayingRun): Promise<{ canContinue: boolean }> {
    const filledConditions = this.actionRepository.fillInputData(schema.conditions, run.data)
    const canContinue = await this.executeCondition(filledConditions, run)
    return { canContinue }
  }

  private async executeCondition(conditions: ConditionsSchema, run: PlayingRun) {
    if ('and' in conditions) {
      const { and } = conditions
      for (const condition of and) {
        const canContinue = await this.executeCondition(condition, run)
        if (!canContinue) {
          return false
        }
      }
    } else {
      switch (conditions.operator) {
        case 'exists':
          return (
            conditions.input !== '' && conditions.input !== undefined && conditions.input !== null
          )
        case 'contains': {
          return conditions.input.includes(conditions.value)
        }
      }
    }
    return true
  }
}
