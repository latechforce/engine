import type { InputFormSchema } from './InputSchema'
import type { FormConfig } from '/domain/entities/Form'

/**
 * Form configuration interface
 * @title Form
 * @description Defines a form for data input and submission
 */
export interface FormSchema {
  /**
   * Form name
   * @title Name
   * @description The name of the form.
   */
  name: FormConfig['name']
  /**
   * Form path
   * @title Path
   * @description The URL path where the form is accessible.
   */
  path: FormConfig['path']
  /**
   * Form title
   * @title Title
   * @description The display title of the form.
   */
  title?: FormConfig['title']
  /**
   * Form description
   * @title Description
   * @description The description of the form.
   */
  description?: FormConfig['description']
  /**
   * Associated table
   * @title Table
   * @description The name of the table this form is associated with.
   */
  table: FormConfig['table']
  /**
   * Form inputs
   * @title Inputs
   * @description The input fields of the form.
   */
  inputs: InputFormSchema[]
  /**
   * Submit button label
   * @title Submit label
   * @description The text displayed on the submit button.
   */
  submitLabel?: FormConfig['submitLabel']
  /**
   * Success message
   * @title Success message
   * @description The message displayed after successful form submission.
   */
  successMessage?: FormConfig['successMessage']
}
