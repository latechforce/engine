import { injectable } from 'inversify'
import vm from 'node:vm'
import ts from 'typescript'
import { ESLint } from 'eslint'
import js from '@eslint/js'
import type { Fields } from '../../../table/domain/object-value/fields.object-value'
import type { Record } from '../../../table/domain/entity/record.entity'
import type { ObjectDto } from '../../../bucket/application/dto/object.dto'
import type { ConditionsSchema } from '../../domain/schema/condition'
import type { ActionResult } from '../../domain/value-object/action-result.value-object'
import type { IntegrationError } from '../../domain/value-object/integration-error.value-object'
import type { IntegrationActionSchema } from '../../../../shared/integrations/core/action.schema'

export type TableContext = <T extends Fields>(
  name: string
) => {
  exists: (id: string) => Promise<boolean>
  create: (fields: T) => Promise<Record<T>>
  createMany: (records: { fields: T }[]) => Promise<Record<T>[]>
  update: (id: string, fields: Partial<T>) => Promise<Record<T>>
  updateMany: (records: { id: string; fields: Partial<T> }[]) => Promise<Record<T>[]>
  delete: (id: string) => Promise<void>
  deleteMany: (ids: string[]) => Promise<void>
  read: (id: string) => Promise<Record<T> | undefined>
  list: (filter?: ConditionsSchema) => Promise<Record<T>[]>
}

export type BucketContext = (name: string) => {
  upload: (key: string, data: Uint8Array) => Promise<void>
  download: (key: string) => Promise<Uint8Array>
  delete: (key: string) => Promise<void>
  get: (key: string) => Promise<ObjectDto>
  list: () => Promise<ObjectDto[]>
}

export type LogContext = {
  info: (message: string) => void
  debug: (message: string) => void
  error: (message: string) => void
}

export type ActionContext = (
  schema: IntegrationActionSchema
) => Promise<ActionResult<IntegrationError>>

export type ServiceContext = {
  log: LogContext
  table: TableContext
  bucket: BucketContext
  action: ActionContext
}

export type CodeContext<T = {}, E = {}> = {
  inputData: T
  externals: E
  table: TableContext
  bucket: BucketContext
  action: ActionContext
  log: LogContext
}

const globals = {
  fetch: global.fetch,
  Error: global.Error,
  Buffer: global.Buffer,
  Date: global.Date,
  Array: global.Array,
  Number: global.Number,
  Boolean: global.Boolean,
  Math: global.Math,
  URLSearchParams: global.URLSearchParams,
  setTimeout: setTimeout,
  console: global.console,
  TextEncoder: global.TextEncoder,
  TextDecoder: global.TextDecoder,
  Blob: global.Blob,
  ReadableStream: global.ReadableStream,
  File: global.File,
}

@injectable()
export class CodeService {
  constructor(private readonly externals: { [key: string]: unknown }) {}

  private buildCode(code: string) {
    return `(${code})({ externals, inputData, table, bucket, log, action })`
  }

  private getContext(inputData: { [key: string]: unknown }, service: ServiceContext) {
    return {
      ...globals,
      externals: this.externals,
      inputData,
      ...service,
    }
  }

  async lint(
    code: string,
    inputData: { [key: string]: unknown },
    service: ServiceContext
  ): Promise<string | undefined> {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: {
        ...js.configs.recommended,
        languageOptions: {
          globals: Object.keys(this.getContext(inputData, service)).reduce(
            (acc: { [key: string]: 'readonly' }, key) => {
              acc[key] = 'readonly'
              return acc
            },
            {}
          ),
        },
      },
    })
    const results = await eslint.lintText(this.buildCode(code))
    const formatter = await eslint.loadFormatter('stylish')
    const message = await formatter.format(results)
    if (message.length === 0) {
      return undefined
    }
    return message
  }

  runTypescript(tsCode: string, inputData: { [key: string]: unknown }, service: ServiceContext) {
    const { outputText: jsCode } = ts.transpileModule(tsCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        noEmitHelpers: true,
        importHelpers: false,
      },
    })
    return this.runJavascript(jsCode, inputData, service)
  }

  runJavascript(jsCode: string, inputData: { [key: string]: unknown }, service: ServiceContext) {
    const vmScript = new vm.Script(this.buildCode(jsCode))
    const vmContext = vm.createContext(this.getContext(inputData, service))
    return vmScript.runInContext(vmContext)
  }
}
