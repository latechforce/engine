import { InputContext } from './BaseInput'
import type { MultipleAttachmentInputProps } from '/domain/components/Form/Input/MultipleAttachmentInput'

// https://preline.co/docs/file-input.html

export const MultipleAttachmentInput = ({
  field,
  label,
  description,
  placeholder,
  required,
}: MultipleAttachmentInputProps) => {
  return (
    <InputContext label={label} description={description} field={field} required={required}>
      <label className="block">
        <span className="sr-only">{placeholder}</span>
        <input
          type="file"
          name={field}
          multiple
          required={!!required}
          className="block w-full text-sm text-gray-500 file:me-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 file:disabled:pointer-events-none file:disabled:opacity-50 dark:text-neutral-500 dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
        />
      </label>
    </InputContext>
  )
}
