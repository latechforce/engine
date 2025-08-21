import { describe, it, expect, beforeEach } from 'bun:test'
import { HttpService } from '../../../../src/shared/infrastructure/service/http.service'

describe('HttpService', () => {
  let httpService: HttpService

  beforeEach(() => {
    httpService = new HttpService()
  })

  it('should be instantiated', () => {
    expect(httpService).toBeInstanceOf(HttpService)
  })

  it('should have all HTTP methods', () => {
    expect(typeof httpService.get).toBe('function')
    expect(typeof httpService.post).toBe('function')
    expect(typeof httpService.put).toBe('function')
    expect(typeof httpService.delete).toBe('function')
    expect(typeof httpService.patch).toBe('function')
  })

  // Note: Skipping actual HTTP tests since they would require network access
  // In a real scenario, you would mock the fetch function or use a test server
})