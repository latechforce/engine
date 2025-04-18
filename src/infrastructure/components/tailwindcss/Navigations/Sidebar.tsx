import type { SidebarProps } from '/domain/components'

export const Sidebar = ({ brand, brandHref, items, children }: SidebarProps) => {
  const activeClass =
    'cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white'
  const inactiveClass =
    'cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200'
  return (
    <div>
      <div className="py-16 text-center lg:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-800 bg-gray-800 px-3 py-2 text-start align-middle text-sm font-medium text-white shadow-2xs hover:bg-gray-950 focus:bg-gray-900 focus:outline-hidden dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-sidebar-basic-usage"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-sidebar-basic-usage"
        >
          Open
        </button>
      </div>
      <div
        id="hs-sidebar-basic-usage"
        className="hs-overlay hs-overlay-open:translate-x-0 fixed start-0 top-0 bottom-0 z-60 hidden h-full w-64 -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] lg:end-auto lg:bottom-0 lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex h-full max-h-full flex-col">
          <header className="flex items-center justify-between gap-x-2 p-4">
            <a
              className="flex-none text-xl font-semibold text-black focus:opacity-80 focus:outline-hidden dark:text-white"
              href={brandHref}
              aria-label={brand}
            >
              {brand}
            </a>

            <div className="-me-2 lg:hidden">
              {/* Close Button */}
              <button
                type="button"
                className="flex size-6 items-center justify-center gap-x-3 rounded-full border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:bg-neutral-700 dark:focus:text-neutral-200"
                data-hs-overlay="#hs-sidebar-basic-usage"
              >
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
              {/* End Close Button */}
            </div>
          </header>
          {/* End Header */}

          {/* Body */}
          <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
            <div className="flex w-full flex-col flex-wrap px-2 pb-0">
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`${item.active ? activeClass : inactiveClass}`}
                      {...item.aAttributes}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          {/* End Body */}
        </div>
      </div>
      <div className="lg:ml-64">{children}</div>
    </div>
  )
}
