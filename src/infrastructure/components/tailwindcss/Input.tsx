import type { InputProps } from '/domain/entities/Form/Input'

export const Input = ({ field, type, label, description, placeholder, required }: InputProps) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={field}
          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
        >
          {label}
        </label>
      ) : null}
      {description ? (
        <p
          className="mb-2 text-sm text-gray-500 dark:text-neutral-500"
          id={'description-' + description}
        >
          {description}
        </p>
      ) : null}
      <input
        type={type}
        name={field}
        placeholder={placeholder}
        required={!!required}
        className="py-2.5 sm:py-3 px-4 block w-full bg-white border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        aria-describedby={description ? 'description-' + field : undefined}
      />
    </div>
  )
}
