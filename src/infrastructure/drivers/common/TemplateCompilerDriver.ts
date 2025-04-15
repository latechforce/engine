import type { ITemplateCompilerDriver } from '/adapter/spi/drivers/TemplateCompilerSpi'
import Handlebars from 'handlebars'
import { TemplateDriver } from './TemplateDriver'
import { parse, format } from 'date-fns'

Handlebars.registerHelper('default', (value, defaultValue?: string) => {
  if (typeof value === 'object') {
    return new Handlebars.SafeString(JSON.stringify(value))
  }
  return value ? String(value) : typeof defaultValue === 'string' ? defaultValue : ''
})

Handlebars.registerHelper('formatDate', (value, inputFormat, outputFormat) => {
  const parsedDate = parse(value, inputFormat, new Date())
  return format(parsedDate, outputFormat)
})

Handlebars.registerHelper('lookup', (obj, key) => {
  return obj[key]
})

export class TemplateCompilerDriver implements ITemplateCompilerDriver {
  compile = (text: string) => {
    const processedText = text.replace(/\{\{\s*([^{}\s][^{}]*[^{}\s]?)\s*\}\}/g, (_, variable) => {
      const trimmedVariable = variable.trim()
      const hasHelper = /^\s*\w+\s/.test(trimmedVariable)
      return hasHelper ? `{{${trimmedVariable}}}` : `{{{default ${trimmedVariable}}}}`
    })
    return new TemplateDriver(text, Handlebars.compile(processedText))
  }
}
