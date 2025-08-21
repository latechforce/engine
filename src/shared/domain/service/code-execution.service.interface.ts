export interface ICodeExecutionService {
  executeTypeScript(
    code: string,
    inputData: Record<string, unknown>
  ): Promise<{ [key: string]: unknown }>
  executeJavaScript(
    code: string,
    inputData: Record<string, unknown>
  ): Promise<{ [key: string]: unknown }>
  lint(code: string, inputData: Record<string, unknown>): Promise<string | undefined>
}
