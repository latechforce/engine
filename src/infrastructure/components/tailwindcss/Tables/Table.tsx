import type { TableProps } from '/domain/components'

export const Table = ({ columns, rows, actions }: TableProps) => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden">
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
                  {actions && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Actions
                    </th>
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
                    {actions && (
                      <td className="px-6 py-4 text-end text-sm font-medium whitespace-nowrap">
                        {actions.map((action, index) => (
                          <a
                            key={index}
                            className="inline-flex items-center gap-x-2 rounded-lg border border-transparent text-sm font-semibold text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                            {...action(row).aAttributes}
                          >
                            {action(row).label}
                          </a>
                        ))}
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
