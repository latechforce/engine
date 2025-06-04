import { beforeEach, describe, expect, it } from 'bun:test'
import { TemplateService } from '../../../../src/shared/infrastructure/service/template.service'
import { registerDependencies } from '../../../../src/shared/infrastructure/di/container'
import TYPES from '../../../../src/shared/application/di/types'

describe('TemplateService', () => {
  let templateService: TemplateService

  beforeEach(async () => {
    process.env.PORT = '3000'
    const container = await registerDependencies({}, {} as any)
    templateService = container.get<TemplateService>(TYPES.Service.Template)
  })

  it('should fill a template', () => {
    const template = 'Hello, {{name}}!'
    const data = { name: 'John' }
    const filledTemplate = templateService.fill(template, data)
    expect(filledTemplate).toBe('Hello, John!')
  })

  it('should fill a template with a json helper', () => {
    const template = '{{json body}}'
    const data = { body: { name: 'John' } }
    const filledTemplate = templateService.fill(template, data)
    expect(filledTemplate).toStrictEqual({ name: 'John' })
  })

  it('should fill a template with a json helper and empty data', () => {
    const template = '{{json body}}'
    const data = {}
    const filledTemplate = templateService.fill(template, data)
    expect(filledTemplate).toBeNull()
  })

  it('should fill a template with a number helper', () => {
    const template = '{{number body}}'
    const data = { body: 20 }
    const filledTemplate = templateService.fill(template, data)
    expect(filledTemplate).toBe(20)
  })

  it('should fill a template with a boolean helper', () => {
    const template = '{{boolean body}}'
    const data = { body: true }
    const filledTemplate = templateService.fill(template, data)
    expect(filledTemplate).toBe(true)
  })

  it('should fill a template with a env helper', () => {
    const template = '{{env "BASE_URL"}}'
    const filledTemplate = templateService.fill(template)
    expect(filledTemplate).toBe('http://localhost:3000')
  })

  it('should throw an error if the env variable of a template is not set', () => {
    const template = '{{env "INVALID_ENV_VAR"}}'
    expect(() => templateService.fill(template)).toThrow(
      'Environment variable "INVALID_ENV_VAR" is not set'
    )
  })

  it('should fill a template with a env helper and default value', () => {
    const template = '{{env "NAME" "https://example.com"}}'
    const filledTemplate = templateService.fill(template)
    expect(filledTemplate).toBe('https://example.com')
  })
})
