export interface IHttpService {
  get(url: string, headers?: Record<string, string>): Promise<{ [key: string]: unknown }>
  post(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<{ [key: string]: unknown }>
  put(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<{ [key: string]: unknown }>
  delete(url: string, headers?: Record<string, string>): Promise<{ [key: string]: unknown }>
  patch(
    url: string,
    body: unknown,
    headers?: Record<string, string>
  ): Promise<{ [key: string]: unknown }>
}
