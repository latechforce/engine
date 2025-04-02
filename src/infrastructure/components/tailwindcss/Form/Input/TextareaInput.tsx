import { InputContext } from './BaseInput'
import type { TextareaInputProps } from '/domain/components/Form/Input/TextareaInput'

export const TextareaInput = ({
  field,
  label,
  description,
  placeholder,
  required,
  minLength,
  maxLength,
}: TextareaInputProps) => {
  return (
    <InputContext label={label} description={description} field={field} required={required}>
      <textarea
        id={field}
        name={field}
        required={!!required}
        className="block w-full rounded-lg border-gray-200 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        rows={3}
        placeholder={placeholder}
        data-hs-textarea-auto-height=""
        minLength={minLength}
        maxLength={maxLength}
      ></textarea>
    </InputContext>
  )
}
