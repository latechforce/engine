import { Dropdown } from '../Overlays/Dropdown'
import type { TableProps } from '/domain/components'

export const Table = ({ columns, rows, dropdown }: TableProps) => {
  return (
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
                {rows.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column, index) =>
                      index === 0 ? (
                        <td
                          key={index}
                          className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-neutral-200"
                        >
                          {row[column.key]}
                        </td>
                      ) : (
                        <td
                          key={index}
                          className="px-6 py-4 text-sm whitespace-nowrap text-gray-800 dark:text-neutral-200"
                        >
                          {row[column.key]}
                        </td>
                      )
                    )}
                    {dropdown && (
                      <td className="px-6 py-4 text-end text-sm font-medium whitespace-nowrap">
                        <Dropdown {...dropdown(row)} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
