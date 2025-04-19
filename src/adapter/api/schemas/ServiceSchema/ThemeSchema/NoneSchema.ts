import type { ThemeConfigNone } from '/domain/services'

/**
 * @title None
 * @description Configuration schema for the theme service when using none
 */
export interface NoneThemeServiceSchema {
  /**
   * @title Type
   * @description The type of theme to use, must be 'none'
   */
  type: ThemeConfigNone['type']
}
