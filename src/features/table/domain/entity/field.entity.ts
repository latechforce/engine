import type { FieldSchema } from '@/types'

export class Field {
  public readonly slug: string

  constructor(public readonly schema: FieldSchema) {
    this.slug = this.slugify(schema.name)
  }

  private slugify(text: string) {
    let slug = text
      .toLowerCase()
      .normalize('NFD') // normalize accents
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/[^a-z0-9]+/g, '_') // replace non-alphanumeric with underscore
      .replace(/^_+|_+$/g, '') // remove leading/trailing underscores

    // Make sure it starts with a letter
    slug = slug.replace(/^[^a-z]+/, '')

    // Truncate to 63 characters
    slug = slug.slice(0, 63)

    if (slug.length === 0) {
      slug = `field_${Math.random().toString(36).substring(2, 8)}`
    }

    return slug
  }
}
