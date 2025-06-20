import type { ConditionsSchema } from '../../domain/schema/condition'
import type { Run } from '../../../run/domain/entity/run.entity'
import { injectable } from 'inversify'

@injectable()
export class RunFilterUseCase {
  constructor() {}

  async execute(schema: ConditionsSchema, run: Run): Promise<{ canContinue: boolean }> {
    const canContinue = await this.executeCondition(schema, run)
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
            conditions.target !== '' &&
            conditions.target !== undefined &&
            conditions.target !== null
          )
        case 'contains': {
          return conditions.target.includes(conditions.value)
        }
        case 'does-not-exist':
          return (
            conditions.target === '' ||
            conditions.target === undefined ||
            conditions.target === null
          )
        case 'does-not-contain':
          return !conditions.target.includes(conditions.value)
        case 'is-true':
          return conditions.target === 'true' || conditions.target === '1'
        case 'is-false':
          return conditions.target === 'false' || conditions.target === '0'
        default: {
          const _exhaustiveCheck: never = conditions
          throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
        }
      }
    }
  }
}
