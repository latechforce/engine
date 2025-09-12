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
        if (element.tag === 'title') {
          return `<title>${element.content}</title>`
        }
        if (element.tag === 'meta') {
          return `<meta name="${element.name}" content="${element.content}" />`
        }
        if (element.tag === 'script') {
          const attrs = []
          if (element.src) attrs.push(`src="${element.src}"`)
          if (element.type) attrs.push(`type="${element.type}"`)
          if (element.async) attrs.push('async')
          if (element.defer) attrs.push('defer')
          const attributesString = attrs.length > 0 ? ` ${attrs.join(' ')}` : ''
          const content = element.content || ''
          return `<script${attributesString}>${content}</script>`
        }
        if (element.tag === 'style') {
          const attrs = []
          if (element.type) attrs.push(`type="${element.type}"`)
          if (element.media) attrs.push(`media="${element.media}"`)
          const attributesString = attrs.length > 0 ? ` ${attrs.join(' ')}` : ''
          return `<style${attributesString}>${element.content}</style>`
        }
        if (element.tag === 'link') {
          const attrs = []
          attrs.push(`href="${element.href}"`)
          attrs.push(`rel="${element.rel}"`)
          if (element.type) attrs.push(`type="${element.type}"`)
          if (element.media) attrs.push(`media="${element.media}"`)
          if (element.sizes) attrs.push(`sizes="${element.sizes}"`)
          if (element.crossorigin) attrs.push(`crossorigin="${element.crossorigin}"`)
          const attributesString = attrs.join(' ')
          return `<link ${attributesString} />`
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
