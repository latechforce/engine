import { InputContext } from './BaseInput'
import type { CheckboxInputProps } from '/domain/components/Form/Input/CheckboxInput'

export const CheckboxInput = ({ field, label, description, required }: CheckboxInputProps) => {
  return (
    <InputContext label={label} description={description} field={field} required={required}>
      <input
        type="checkbox"
        name={field}
        required={!!required}
        className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
      />
    </InputContext>
  )
}
