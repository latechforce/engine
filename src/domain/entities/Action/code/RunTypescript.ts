import { Base, type BaseConfig, type BaseServices } from '../base'
import type { Context } from '../../Automation/Context'
import type { CodeRunner } from '@domain/services/CodeRunner'
import type { CodeCompiler } from '@domain/services/CodeCompiler'
import { Template, type InputValues, type OutputValue } from '@domain/services/Template'
import type { TemplateCompiler } from '@domain/services/TemplateCompiler'

export interface Config extends BaseConfig {
  input?: InputValues
  code: string
  env?: { [key: string]: string }
}

export interface Services extends BaseServices {
  typescriptCompiler: CodeCompiler
  templateCompiler: TemplateCompiler
}

type Input = { [key: string]: OutputValue }
type Output = object

export class RunTypescript extends Base<Input, Output> {
  private _script: CodeRunner
  private _input: { [key: string]: Template }

  constructor(config: Config, services: Services) {
    const { env, ...res } = config
    super(res, services)
    const { code, input } = config
    const { typescriptCompiler, templateCompiler } = services
    this._script = typescriptCompiler.compile(code, env ?? {})
    this._input = templateCompiler.compileObjectWithType(input ?? {})
  }

  protected _prepare = async (context: Context) => {
    return context.fillObjectTemplate(this._input)
  }

  protected _process = async (input: Input) => {
    return this._script.run(input)
  }
}
