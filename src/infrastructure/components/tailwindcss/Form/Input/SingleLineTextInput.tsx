import { InputDescription, InputLabel } from './BaseInput'
import type { SingleLineTextInputProps } from '/domain/components/Form/Input/SingleLineTextInput'

export const SingleLineTextInput = ({
  field,
  label,
  description,
  placeholder,
  required,
}: SingleLineTextInputProps) => {
  return (
    <div>
      {label ? <InputLabel label={label} field={field} /> : null}
      {description ? <InputDescription description={description} /> : null}
      <input
        type="text"
        name={field}
        placeholder={placeholder}
        required={!!required}
        className="py-2.5 sm:py-3 px-4 block w-full bg-white border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      />
    </div>
  )
}
