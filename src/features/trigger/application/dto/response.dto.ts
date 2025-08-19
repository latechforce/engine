export type ResponseDto = {
  body:
    | {
        success: boolean
        data?: object
        runId?: string
      }
    | object
  headers?: Record<string, string>
}
