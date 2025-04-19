import type { NoneThemeServiceSchema } from './NoneSchema'
import type { TailwindcssThemeServiceSchema } from './TailwindcssSchema'

/**
 * Theme configuration interface
 * @title Theme
 * @description Configuration for the theme service
 * @default
 * {
 *   type: "tailwindcss"
 * }
 */
export type ThemeServiceSchema = TailwindcssThemeServiceSchema | NoneThemeServiceSchema
