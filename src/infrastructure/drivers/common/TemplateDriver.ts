import type { ITemplateDriver } from '/adapter/spi/drivers/TemplateSpi'

export class TemplateDriver implements ITemplateDriver {
  constructor(
    private _text: string,
    private _template: HandlebarsTemplateDelegate
  ) {}

  fill = (data: { [key: string]: unknown }) => {
    const value = this._template(data)
    if (value === '') {
      throw new Error(`${this._text} is not defined`)
    }
    return value
  }
}
