import type { PageSchema } from '../schema/page.schema'

export class Page {
  constructor(public readonly schema: PageSchema) {}

  get name(): string {
    return this.schema.name
  }

  get path(): string {
    return this.schema.path
  }

  generateHTML(): string {
    const headElements = this.schema.head
      .map((element) => {
        if (element.type === 'title') {
          return `<title>${element.content}</title>`
        }
        if (element.type === 'meta') {
          return `<meta name="${element.name}" content="${element.content}" />`
        }
        return ''
      })
      .join('\n    ')

    const bodyElements = this.schema.body
      .map((element) => {
        if (element.type === 'custom-html') {
          return element.content
        }
        return ''
      })
      .join('\n    ')

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${headElements}
  </head>
  <body>
    ${bodyElements}
  </body>
</html>`
  }
}
