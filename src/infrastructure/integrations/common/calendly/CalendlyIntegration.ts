import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type { IntegrationResponseError } from '/domain/integrations/base'
import type { CalendlyConfig } from '/domain/integrations/Calendly/CalendlyConfig'
import type { CalendlyError } from '/domain/integrations/Calendly/CalendlyTypes'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

export class CalendlyIntegration implements ICalendlyIntegration {
  private _instance: AxiosInstance

  constructor(config?: CalendlyConfig) {
    const headers = {
      Authorization: `Bearer ${config?.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    this._instance = axios.create({
      baseURL: 'https://api.calendly.com',
      headers,
    })
  }

  private _errorMapper = (response: AxiosResponse<CalendlyError>): IntegrationResponseError => {
    const { title, message } = response.data
    return {
      error: {
        status: response.status,
        message: `${title}: ${message}`,
      },
    }
  }

  checkConfiguration = async (): Promise<IntegrationResponseError | undefined> => {
    try {
      // Using the /users endpoint as it's a lightweight call to verify authentication
      await this._instance.get('/users/me')
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return this._errorMapper(error.response)
      }
      throw error
    }
  }
}
