import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type {
  GoCardlessPayment,
  GoCardlessConfig,
  GoCardlessCreatePayment,
  GoCardlessListPayment,
  GoCardlessPaymentList,
} from '/domain/integrations/GoCardless'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

export class GoCardlessIntegration implements IGoCardlessIntegration {
  private _instance: AxiosInstance

  constructor(public config: GoCardlessConfig) {
    const headers = {
      Authorization: `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'GoCardless-Version': '2015-07-06',
    }
    switch (config.environment) {
      case 'sandbox':
        this._instance = axios.create({
          baseURL: 'https://api-sandbox.gocardless.com/',
          headers,
        })
        break
      case 'production':
        this._instance = axios.create({
          baseURL: 'https://api.gocardless.com/',
          headers,
        })
        break
    }
  }

  createPayment = async (payment: GoCardlessCreatePayment): Promise<GoCardlessPayment> => {
    const { mandate, ...rest } = payment
    const response = await this._api()
      .post('/payments', {
        payments: {
          ...rest,
          links: {
            mandate,
          },
        },
      })
      .catch((error) => {
        return error.response
      })
    if (response.status === 201) {
      return response.data.payments
    } else {
      return this._throwError(response)
    }
  }

  listPayments = async (params: GoCardlessListPayment = {}): Promise<GoCardlessPaymentList> => {
    const response = await this._api()
      .get('/payments', { params })
      .catch((error) => {
        return error.response
      })
    if (response.status === 200) {
      return {
        payments: response.data.payments,
        meta: response.data.meta,
      }
    } else {
      return this._throwError(response)
    }
  }

  private _api = (): AxiosInstance => {
    if (!this._instance) {
      const config = this.getConfig()
      const headers = {
        Authorization: `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'GoCardless-Version': '2015-07-06',
      }
      switch (config.environment) {
        case 'sandbox':
          this._instance = axios.create({
            baseURL: 'https://api-sandbox.gocardless.com/',
            headers,
          })
          break
        case 'production':
          this._instance = axios.create({
            baseURL: 'https://api.gocardless.com/',
            headers,
          })
          break
      }
    }
    return this._instance
  }

  private _throwError = (response: AxiosResponse) => {
    const {
      code,
      message,
      errors: [{ field, message: detail }] = [{ field: '', message: '' }],
    } = response.data.error
    throw new Error(
      `Error "${code}" fetching data from GoCardless ${this.getConfig().environment} API: ${message}${detail ? ', ' + field + ' ' + detail : ''}`
    )
  }
}
