import type { DropdownProps } from '/domain/components'

export const Dropdown = ({ label, items }: DropdownProps) => {
  return (
    <div className="hs-dropdown relative inline-flex [--auto-close:inside]">
      <button
        id="hs-dropdown-custom-icon-trigger"
        type="button"
        className="hs-dropdown-toggle flex size-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:bg-gray-50 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
      >
        {label}
      </button>
      <div
        className="hs-dropdown-menu duration hs-dropdown-open:opacity-100 mt-2 hidden min-w-60 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] dark:border dark:border-neutral-700 dark:bg-neutral-800"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="hs-dropdown-custom-icon-trigger"
      >
        <div className="space-y-0.5 p-1">
          {items.map((item, index) => (
            <a
              key={index}
              className="flex cursor-pointer items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              {...item.aAttributes}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
