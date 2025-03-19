export interface BaseSpi {
  checkConfiguration: () => Promise<IntegrationResponseError | undefined>
}

export interface IntegrationResponseData<D> {
  data: D
  error?: undefined
}

export interface IntegrationResponseError {
  data?: undefined
  error: {
    status: number
    message: string
  }
}

export type IntegrationResponse<T> = IntegrationResponseData<T> | IntegrationResponseError

export class Integration<T extends BaseSpi> {
  private _isConfigurationChecked = false

  constructor(protected _spi: T) {}

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    if (this._isConfigurationChecked) return
    const response = await this._spi.checkConfiguration()
    this._isConfigurationChecked = true
    return response
  }

  protected _throwError = (method: string, error: IntegrationResponseError['error']) => {
    throw new Error(
      `${error.status} error from ${this.constructor.name} ${method} API: ${error.message}`
    )
  }
}
