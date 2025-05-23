import type { IActionRepository } from '../../domain/repository-interface/action-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import type { CodeService } from '../service/code.service'
import type { LoggerService } from '../service/logger.service'
import type { TemplateService } from '../service/template.service'

@injectable()
export class ActionRepository implements IActionRepository {
  constructor(
    @inject(TYPES.Service.Code)
    private readonly codeService: CodeService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Template)
    private readonly templateService: TemplateService
  ) {
    this.logger = this.logger.child('action-repository')
  }

  debug(message: string) {
    this.logger.debug(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  code(inputData: Record<string, string> = {}) {
    return {
      lint: (code: string) => this.codeService.lint(code, inputData),
      fillInputData: (data: Record<string, unknown>) =>
        this.templateService.fillObject(inputData, data) as Record<string, string>,
      runJavascript: (code: string) => this.codeService.runJavascript(code, inputData),
      runTypescript: (code: string) => this.codeService.runTypescript(code, inputData),
    }
  }

  http(url: string, options?: RequestInit) {
    return {
      get: () => fetch(url, options).then((res) => res.json()),
    }
  }
}
