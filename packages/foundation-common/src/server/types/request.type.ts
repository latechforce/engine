export type RequestType = {
  locals: {
    [key: string]: unknown
  }
  query: {
    [key: string]: string
  }
  body?: {
    [key: string]: unknown
  }
}