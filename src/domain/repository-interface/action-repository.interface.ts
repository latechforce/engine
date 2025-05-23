export type IActionRepository = {
  debug(message: string): void
  error: (message: string) => void
  code: (inputData?: Record<string, string>) => {
    lint: (code: string) => Promise<string | undefined>
    fillInputData: (data: Record<string, unknown>) => Record<string, string>
    runJavascript: (code: string) => Promise<object>
    runTypescript: (code: string) => Promise<object>
  }
  http: (
    url: string,
    options?: RequestInit
  ) => {
    get: () => Promise<object>
    post: () => Promise<object>
  }
}
