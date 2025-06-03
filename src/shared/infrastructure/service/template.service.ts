import Handlebars from 'handlebars'
import { injectable } from 'inversify'

@injectable()
export class TemplateService {
  fill(template: string, data: object) {
    const compiled = Handlebars.compile(template)
    return compiled(data)
  }

  fillObject<T extends Record<string, unknown>>(object: T, data: object): T {
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
