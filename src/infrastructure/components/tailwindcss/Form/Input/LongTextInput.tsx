import { InputContext } from './BaseInput'
import type { LongTextInputProps } from '/domain/components/Form/Input/LongTextInput'

export const LongTextInput = ({
  field,
  label,
  description,
  placeholder,
  required,
}: LongTextInputProps) => {
  return (
    <InputContext label={label} description={description} field={field} required={required}>
      <textarea
        id={field}
        name={field}
        required={!!required}
        className="py-2 px-3 sm:py-3 sm:px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        rows={3}
        placeholder={placeholder}
        data-hs-textarea-auto-height=""
      ></textarea>
    </InputContext>
  )
}
