import { Context } from './Base'
import type { InputProps } from '/domain/components/BasicForms/Input'

export const Input = ({
  field,
  type,
  label,
  description,
  placeholder,
  required,
  minLength,
  maxLength,
}: InputProps) => {
  return (
    <Context label={label} description={description} field={field} required={required}>
      <input
        type={type}
        name={field}
        placeholder={placeholder}
        required={!!required}
        minLength={minLength}
        maxLength={maxLength}
        className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      />
    </Context>
  )
}
