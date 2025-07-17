export type ResponseDto =
  | {
      success: boolean
      data?: object
      runId?: string
    }
  | object
