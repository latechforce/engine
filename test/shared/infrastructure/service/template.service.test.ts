import { describe, expect, it } from 'bun:test'
import { TemplateService } from '../../../../src/shared/infrastructure/service/template.service'
import { registerDependencies } from '../../../../src/shared/infrastructure/di/container'
import TYPES from '../../../../src/shared/application/di/types'

const container = await registerDependencies({}, {} as any)
const templateService = container.get<TemplateService>(TYPES.Service.Template)

describe('TemplateService', () => {
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
})
