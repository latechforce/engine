import { injectable } from 'inversify'
import vm from 'node:vm'
import ts from 'typescript'
import { ESLint } from 'eslint'
import js from '@eslint/js'
import type { Fields } from '@/table/domain/object-value/fields.object-value'
import type { Record } from '@/table/domain/entity/record.entity'

export type TableContext = (name: string) => {
  exists: (id: string) => Promise<boolean>
  create: (fields: Fields) => Promise<Record>
  createMany: (records: { fields: Fields }[]) => Promise<Record[]>
  update: (id: string, fields: Fields) => Promise<Record>
  updateMany: (records: { id: string; fields: Fields }[]) => Promise<Record[]>
  delete: (id: string) => Promise<void>
  deleteMany: (ids: string[]) => Promise<void>
  read: (id: string) => Promise<Record | undefined>
  list: () => Promise<Record[]>
}

export type CodeContext<T = {}, E = {}> = {
  inputData: T
  externals: E
  table: TableContext
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
    return `(${code})({ externals, inputData, table })`
  }

  private getContext(inputData: { [key: string]: unknown }, table: TableContext) {
    return {
      ...globals,
      externals: this.externals,
      inputData,
      table,
    }
  }

  async lint(
    code: string,
    inputData: { [key: string]: unknown },
    table: TableContext
  ): Promise<string | undefined> {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: {
        ...js.configs.recommended,
        languageOptions: {
          globals: Object.keys(this.getContext(inputData, table)).reduce(
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

  runTypescript(tsCode: string, inputData: { [key: string]: unknown }, table: TableContext) {
    const { outputText: jsCode } = ts.transpileModule(tsCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        noEmitHelpers: true,
        importHelpers: false,
      },
    })
    return this.runJavascript(jsCode, inputData, table)
  }

  runJavascript(jsCode: string, inputData: { [key: string]: unknown }, table: TableContext) {
    const vmScript = new vm.Script(this.buildCode(jsCode))
    const vmContext = vm.createContext(this.getContext(inputData, table))
    return vmScript.runInContext(vmContext)
  }
}
