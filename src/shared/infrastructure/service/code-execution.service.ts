import type { ICodeExecutionService } from '../../domain/service/code-execution.service.interface'
import type { App } from '../../../features/app/domain/entity/app.entity'
import type {
  CodeService,
  ServiceContext,
} from '../../../features/action/infrastructure/service/code.service'

export class CodeExecutionService implements ICodeExecutionService {
  constructor(
    private readonly codeService: CodeService,
    private readonly app: App,
    private readonly serviceContext: ServiceContext
  ) {}

  async executeTypeScript(
    code: string,
    inputData: Record<string, unknown>
  ): Promise<{ [key: string]: unknown }> {
    return await this.codeService.runTypescript(code, inputData, this.serviceContext)
  }

  async executeJavaScript(
    code: string,
    inputData: Record<string, unknown>
  ): Promise<{ [key: string]: unknown }> {
    return await this.codeService.runJavascript(code, inputData, this.serviceContext)
  }

  async lint(code: string, inputData: Record<string, unknown>): Promise<string | undefined> {
    return await this.codeService.lint(code, inputData, this.serviceContext)
  }
}
