import TYPES from '@/shared/infrastructure/di/types'
import type { LoggerService } from '@/shared/infrastructure/service/logger.service'
import type { IAutomationRepository } from '@/automation/domain/repository-interface/automation-repository.interface'
import { inject, injectable } from 'inversify'
import type { TemplateService } from '@/shared/infrastructure/service/template.service'
import type { JSONSchema7 } from 'json-schema'
import { type ValidatorService } from '@/shared/infrastructure/service/validator.service'

@injectable()
export class AutomationRepository implements IAutomationRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Template)
    private readonly templateService: TemplateService,
    @inject(TYPES.Service.Validator)
    private readonly validatorService: ValidatorService
  ) {}

  debug(message: string) {
    this.logger.child('automation-repository').debug(message)
  }

  info(message: string) {
    this.logger.info(message)
  }

  fillTemplateObject(template: Record<string, unknown>, data: object): Record<string, unknown> {
    return this.templateService.fillObject(template, data)
  }

  validateTriggerData(schema: JSONSchema7, data: unknown): boolean {
    return this.validatorService.validate(schema, data)
  }
}
