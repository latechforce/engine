export type BaseRequestParams = {
  path: string
  baseUrl?: string
  headers?: Headers
  query?: { [key: string]: string | undefined }
  params?: { [key: string]: string }
}

export type Headers = { [key: string]: string | undefined }

export class BaseRequest {
  public path: string
  public baseUrl: string
  public headers?: Headers
  public query: { [key: string]: string | undefined }
  public params: { [key: string]: string }

  constructor(params: BaseRequestParams) {
    this.path = params.path
    this.baseUrl = params.baseUrl || ''
    this.headers = params.headers || {}
    this.query = params.query || {}
    this.params = params.params || {}
  }

  getQuery = (key: string): string | undefined => {
    const { query } = this
    if (key in query) return query[key]
    return undefined
  }

  getQueryAsNumber = (key: string, defaultValue: number): number => {
    const value = this.getQuery(key)
    return value ? Number(value) : defaultValue
  }

  getQueryOrThrow = (key: string): string => {
    const value = this.getQuery(key)
    if (value === undefined) {
      throw new Error(`Key ${key} not found in query`)
    }
    return value
  }

  getParam = (key: string): string | undefined => {
    const { params } = this
    if (key in params) return params[key]
    return undefined
  }

  getParamOrThrow = (key: string): string => {
    const value = this.getParam(key)
    if (value === undefined) {
      throw new Error(`Key ${key} not found in params`)
    }
    return value
  }

  toJson = () => {
    return {
      path: this.path,
      baseUrl: this.baseUrl,
      headers: this.headers,
      query: this.query,
      params: this.params,
    }
  }
}
