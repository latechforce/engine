export type ResponseDto = {
  body:
    | {
        success: boolean
        data?: object
        runId?: string
      }
    | object
    | string
  headers?: Record<string, string>
}
