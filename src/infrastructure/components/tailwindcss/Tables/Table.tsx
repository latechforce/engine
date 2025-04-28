import { TableSearch } from './TableSearch'
import { Dropdown } from '../Overlays/Dropdown'
import type { TableProps } from '/domain/components'
import type { ReactNode } from 'react'

// TODO: refacto HTMX (if needed)

export const Table = ({
  id,
  columns,
  rows,
  dropdown,
  total,
  page,
  perPage,
  query,
  searchRoute,
  searchAttributes,
}: TableProps) => {
  const pageNumber = page ?? 1
  const perPageNumber = perPage ?? 10
  const totalPages = total ? Math.ceil(total / perPageNumber) : 1

  return (
    <div id={id}>
      {searchAttributes && (
        <div className="p-6">
          <div className="grid grid-cols-3">
            <TableSearch
              field="q"
              placeholder="Search"
              value={query}
              searchAttributes={searchAttributes}
            />
          </div>
          <div className="grid grid-cols-4"></div>
        </div>
      )}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="overflow-hidden border-y border-gray-200 dark:border-neutral-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        {column.label}
                      </th>
                    ))}
                    {dropdown && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      ></th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {rows.length === 0 && !query && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200"
                      >
                        No items available
                      </td>
                    </tr>
                  )}
                  {rows.length === 0 && query && (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="px-6 py-4 text-sm text-gray-800 dark:text-neutral-200"
                      >
                        No results found for "{query}"
                      </td>
                    </tr>
                  )}
                  {rows.length > 0 &&
                    rows.map((row, index) => (
                      <tr key={index}>
                        {columns.map((column, index) => {
                          const value = row[column.key]
                          const formattedValue = column.formatter ? column.formatter(value) : value
                          return (
                            <td
                              key={index}
                              className={`px-6 py-4 text-sm ${index === 0 ? 'font-medium' : ''} whitespace-nowrap text-gray-800 dark:text-neutral-200`}
                            >
                              {formattedValue as string}
                            </td>
                          )
                        })}
                        {dropdown && (
                          <td
                            key="dropdown"
                            className="px-6 py-4 text-end text-sm font-medium whitespace-nowrap"
                          >
                            <Dropdown {...dropdown(row)} />
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-2">
              <div>
                <p className="text-sm">Total {total ?? rows.length} items</p>
              </div>
              <nav className="flex items-center space-x-1" aria-label="Pagination">
                {pageNumber > 1 && (
                  <PrevButton
                    currentPage={pageNumber}
                    target={`#${id}`}
                    query={query}
                    searchRoute={searchRoute}
                  />
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                  <PageButton
                    key={index}
                    page={index + 1}
                    isCurrent={index + 1 === pageNumber}
                    target={`#${id}`}
                    query={query}
                    searchRoute={searchRoute}
                  />
                ))}
                {pageNumber < totalPages && (
                  <NextButton
                    currentPage={pageNumber}
                    target={`#${id}`}
                    query={query}
                    searchRoute={searchRoute}
                  />
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkButton({
  href,
  className,
  children,
  ariaLabel,
  target,
}: {
  href?: string
  className?: string
  children?: ReactNode
  ariaLabel?: string
  target?: string
}) {
  return (
    <a
      className={`inline-flex min-w-10 cursor-pointer items-center justify-center gap-x-2 rounded-full p-2.5 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${className}`}
      aria-label={ariaLabel}
      hx-push-url="true"
      hx-get={href}
      hx-target={target}
    >
      {children}
    </a>
  )
}

function NextButton({
  currentPage,
  target,
  query,
  searchRoute,
}: {
  currentPage: number
  target?: string
  query?: string
  searchRoute?: string
}) {
  let href = `${searchRoute}?page=${currentPage + 1}`
  if (query) {
    href += `&q=${query}`
  }
  return (
    <LinkButton aria-label="Next" href={href} target={target}>
      <span className="sr-only">Next</span>
      <span aria-hidden="true">»</span>
    </LinkButton>
  )
}

function PrevButton({
  currentPage,
  target,
  query,
  searchRoute,
}: {
  currentPage: number
  target?: string
  query?: string
  searchRoute?: string
}) {
  let href = `${searchRoute}?page=${currentPage - 1}`
  if (query) {
    href += `&q=${query}`
  }
  return (
    <LinkButton aria-label="Next" href={href} target={target}>
      <span aria-hidden="true">«</span>
      <span className="sr-only">Previous</span>
    </LinkButton>
  )
}

function PageButton({
  page,
  isCurrent,
  target,
  query,
  searchRoute,
}: {
  page: number
  isCurrent: boolean
  target?: string
  query?: string
  searchRoute?: string
}) {
  let href = `${searchRoute}?page=${page}`
  if (query) {
    href += `&q=${query}`
  }

  return (
    <a
      className={`flex min-w-10 cursor-pointer items-center justify-center rounded-full py-2.5 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
        isCurrent ? 'bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white' : ''
      }`}
      hx-get={href}
      aria-current={isCurrent ? 'page' : undefined}
      hx-target={target}
      hx-push-url="true"
    >
      {page}
    </a>
  )
}
