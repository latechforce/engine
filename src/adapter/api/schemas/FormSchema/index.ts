import type { InputFormSchema } from './InputSchema'
import type { FormConfig } from '/domain/entities/Form'

/**
 * Form configuration type
 * @title Form
 * @description Type alias for form configuration
 */
export type FormSchema = Omit<FormConfig, 'inputs'> & {
  inputs: InputFormSchema[]
}
