export interface YouCanBookMeError {
  code: string
  errors: Array<{
    code: string
    message: string
    object: string
    field: string
    formFieldNumber: string
    formType: string
  }>
  httpStatusCode: number
  httpCode: number
  status: string
  message: string
  type: string
}
