import { injectable } from 'inversify'
import vm from 'node:vm'
import ts from 'typescript'
import { ESLint } from 'eslint'
import js from '@eslint/js'

export type CodeContext<T = {}, E = {}> = {
  inputData: T
  externals: E
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
  constructor(private readonly externals: Record<string, unknown>) {}

  private buildCode(code: string) {
    return `(${code})({ externals, inputData })`
  }

  private getContext(inputData: Record<string, unknown>) {
    return {
      ...globals,
      externals: this.externals,
      inputData,
    }
  }

  async lint(code: string, inputData: Record<string, unknown>): Promise<string | undefined> {
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: {
        ...js.configs.recommended,
        languageOptions: {
          globals: Object.keys(this.getContext(inputData)).reduce(
            (acc: Record<string, 'readonly'>, key) => {
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

  runTypescript(tsCode: string, inputData: Record<string, unknown>) {
    const { outputText: jsCode } = ts.transpileModule(tsCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        noEmitHelpers: true,
        importHelpers: false,
      },
    })
    return this.runJavascript(jsCode, inputData)
  }

  runJavascript(jsCode: string, inputData: Record<string, unknown>) {
    const vmScript = new vm.Script(this.buildCode(jsCode))
    const vmContext = vm.createContext(this.getContext(inputData))
    return vmScript.runInContext(vmContext)
  }
}
