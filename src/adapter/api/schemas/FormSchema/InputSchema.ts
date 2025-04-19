import type { InputConfig } from '/domain/entities/Form/Input'

/**
 * Input configuration interface
 * @title Input
 * @description Configuration for form input fields
 */
export interface InputFormSchema {
  /**
   * The name of the field this input is associated with
   * @title Field
   * @description The name of the field this input is associated with
   */
  field: InputConfig['field']
  /**
   * The display label for the input field
   * @title Label
   * @description The display label for the input field
   */
  label?: InputConfig['label']
  /**
   * The description of the input field
   * @title Description
   * @description The description of the input field
   */
  description?: InputConfig['description']
  /**
   * The placeholder text for the input field
   * @title Placeholder
   * @description The placeholder text for the input field
   */
  placeholder?: InputConfig['placeholder']
  /**
   * Whether the input field is required
   * @title Required
   * @description Whether the input field is required
   */
  required?: InputConfig['required']
  /**
   * The minimum length of the input value
   * @title Min Length
   * @description The minimum length of the input value
   */
  minLength?: InputConfig['minLength']
  /**
   * The maximum length of the input value
   * @title Max Length
   * @description The maximum length of the input value
   */
  maxLength?: InputConfig['maxLength']
}
