import { Context } from './Base'
import type { TextareaProps } from '/domain/components/BasicForms/Textarea'

export const Textarea = ({
  field,
  label,
  description,
  placeholder,
  required,
  minLength,
  maxLength,
}: TextareaProps) => {
  return (
    <Context label={label} description={description} field={field} required={required}>
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
    </Context>
  )
}
