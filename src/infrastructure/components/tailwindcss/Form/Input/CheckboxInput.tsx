import { InputContext } from './BaseInput'
import type { CheckboxInputProps } from '/domain/components/Form/Input/CheckboxInput'

export const CheckboxInput = ({ field, label, description, required }: CheckboxInputProps) => {
  return (
    <InputContext label={label} description={description} field={field} required={required}>
      <input
        type="checkbox"
        name={field}
        required={!!required}
        className="mt-0.5 shrink-0 rounded-sm border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
      />
    </InputContext>
  )
}
