import Handlebars from 'handlebars'
import { inject, injectable } from 'inversify'
import TYPES from '../../application/di/types'
import { LoggerService } from './logger.service'
import type { EnvService } from './env.service'

@injectable()
export class TemplateService {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Service.Env)
    env: EnvService
  ) {
    this.logger = this.logger.child('template-service')
    Handlebars.registerHelper('json', function (context) {
      return JSON.stringify(context)
    })
    Handlebars.registerHelper('number', function (context) {
      return String(context)
    })
    Handlebars.registerHelper('boolean', function (context) {
      return String(context)
    })
    Handlebars.registerHelper('env', function (key: string, defaultValue?: string) {
      const value = env.getAny(key)
      if (value) return value
      if (typeof defaultValue === 'string') return defaultValue
      throw new Error(`Environment variable "${key}" is not set`)
    })
  }

  fill(template: string, data = {}): string | Record<string, unknown> | number | boolean | null {
    if (template.startsWith('{{json') && template.endsWith('}}')) {
      const jsonTemplate = template.replace('{{json', '{{{json').replace('}}', '}}}')
      const compiled = Handlebars.compile(jsonTemplate)
      try {
        return JSON.parse(compiled(data)) as Record<string, unknown>
      } catch (error) {
        this.logger.error(error instanceof Error ? error.message : 'Unknown error')
        return null
      }
    } else if (template.startsWith('{{number') && template.endsWith('}}')) {
      const compiled = Handlebars.compile(template)
      return Number(compiled(data))
    } else if (template.startsWith('{{boolean') && template.endsWith('}}')) {
      const compiled = Handlebars.compile(template)
      return Boolean(compiled(data))
    }
    const compiled = Handlebars.compile(template)
    return compiled(data)
  }

  fillObject<T extends Record<string, unknown>>(object: T, data = {}): T {
    return Object.entries(object).reduce((acc: Record<string, unknown>, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = this.fill(value, data)
      } else if (Array.isArray(value)) {
        acc[key] = value.map((item) =>
          typeof item === 'string' ? this.fill(item, data) : this.fillObject(item, data)
        )
      } else if (value && typeof value === 'object') {
        acc[key] = this.fillObject(value as Record<string, unknown>, data)
      } else {
        acc[key] = value
      }
      return acc
    }, {}) as T
  }
}
