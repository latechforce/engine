import type { IHttpService } from '../../domain/service/http.service.interface'

export class HttpService implements IHttpService {
  private createRequest(
    method: string,
    url: string,
    body?: unknown,
    headers?: Record<string, string>
  ): RequestInit {
    const requestInit: RequestInit = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (body !== undefined && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      requestInit.body = JSON.stringify(body)
    }

    return requestInit
  }

  private async makeRequest(
    url: string,
    options: RequestInit
  ): Promise<{ [key: string]: unknown }> {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return (await response.json()) as { [key: string]: unknown }
      }

      // For non-JSON responses, wrap in an object
      const text = await response.text()
      return { data: text }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error(`HTTP request failed: ${String(error)}`)
    }
  }

  async get(url: string, headers?: Record<string, string>): Promise<{ [key: string]: unknown }> {
    const options = this.createRequest('GET', url, undefined, headers)
    return await this.makeRequest(url, options)
  }

  async post(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<{ [key: string]: unknown }> {
    const options = this.createRequest('POST', url, body, headers)
    return await this.makeRequest(url, options)
  }

  async put(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<{ [key: string]: unknown }> {
    const options = this.createRequest('PUT', url, body, headers)
    return await this.makeRequest(url, options)
  }

  async delete(url: string, headers?: Record<string, string>): Promise<{ [key: string]: unknown }> {
    const options = this.createRequest('DELETE', url, undefined, headers)
    return await this.makeRequest(url, options)
  }

  async patch(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<{ [key: string]: unknown }> {
    const options = this.createRequest('PATCH', url, body, headers)
    return await this.makeRequest(url, options)
  }
}
