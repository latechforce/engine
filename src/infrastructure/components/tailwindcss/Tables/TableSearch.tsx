import type { TableSearchProps } from '/domain/components/Tables/TableSearch'

export const TableSearch = ({
  field,
  label,
  placeholder,
  value,
  searchAttributes = {},
}: TableSearchProps) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={field}
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="size-4 shrink-0 dark:text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type={'text'}
          name={field}
          placeholder={placeholder}
          aria-describedby="hs-validation-name-success-helper"
          className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 ps-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          value={value}
          {...searchAttributes}
        />
      </div>
    </div>
  )
}
