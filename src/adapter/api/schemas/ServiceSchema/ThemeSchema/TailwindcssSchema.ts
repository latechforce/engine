import type { ThemeConfigTailwindCSS } from '/domain/services'

/**
 * @title TailwindCSS
 * @description Configuration schema for the theme service when using TailwindCSS
 */
export interface TailwindcssThemeServiceSchema {
  /**
   * @title Type
   * @description The type of theme to use, must be 'tailwindcss'
   */
  type: ThemeConfigTailwindCSS['type']
  /**
   * @title Base
   * @description The base directory path for theme files, relative to the project root
   */
  base?: ThemeConfigTailwindCSS['base']
}
