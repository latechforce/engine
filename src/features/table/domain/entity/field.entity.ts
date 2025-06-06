import type { FieldSchema } from '../schema/field'

export class Field {
  public readonly slug: string

  constructor(public readonly schema: FieldSchema) {
    this.slug = this.slugify(schema.name)
  }

  private slugify(text: string) {
    let slug = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
    slug = slug.replace(/^[^a-z]+/, '')
    slug = slug.slice(0, 63)
    if (slug.length === 0) {
      slug = `field_${Math.random().toString(36).substring(2, 8)}`
    }
    return slug
  }
}
