import type { IActionRepository } from '@/action/domain/repository-interface/action-repository.interface'
import type { ConditionsSchema } from '@/action/domain/schema/condition'
import type { Run } from '@/run/domain/entity/run.entity'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'

@injectable()
export class RunFilterUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly actionRepository: IActionRepository
  ) {}

  async execute(schema: ConditionsSchema, run: Run): Promise<{ canContinue: boolean }> {
    const filledConditions = this.actionRepository.fillInputData(schema, run.data)
    const canContinue = await this.executeCondition(filledConditions, run)
    return { canContinue }
  }

  private async executeCondition(conditions: ConditionsSchema, run: Run) {
    if ('and' in conditions) {
      const { and } = conditions
      for (const condition of and) {
        const canContinue = await this.executeCondition(condition, run)
        if (!canContinue) {
          return false
        }
      }
      return true
    } else if ('or' in conditions) {
      const { or } = conditions
      for (const condition of or) {
        const canContinue = await this.executeCondition(condition, run)
        if (canContinue) {
          return true
        }
      }
      return false
    } else {
      switch (conditions.operator) {
        case 'exists':
          return (
            conditions.input !== '' && conditions.input !== undefined && conditions.input !== null
          )
        case 'contains': {
          return conditions.input.includes(conditions.value)
        }
        case 'does-not-exist':
          return (
            conditions.input === '' || conditions.input === undefined || conditions.input === null
          )
        case 'does-not-contain':
          return !conditions.input.includes(conditions.value)
        default: {
          const _exhaustiveCheck: never = conditions
          throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
        }
      }
    }
  }
}
