import { InputContext } from './BaseInput'
import type { SingleLineTextInputProps } from '/domain/components/Form/Input/SingleLineTextInput'

export const SingleLineTextInput = ({
  field,
  label,
  description,
  placeholder,
  required,
}: SingleLineTextInputProps) => {
  return (
    <InputContext label={label} description={description} field={field} required={required}>
      <input
        type="text"
        name={field}
        placeholder={placeholder}
        required={!!required}
        className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      />
    </InputContext>
  )
}
