import { useRouter } from "blitz"

import classNames from "@/app/helpers/classNames"
import { SortAscendingIcon } from "@heroicons/react/solid"
import { SortDescendingIcon } from "@heroicons/react/outline"
import FilterButton from "@/app/filter/components/FilterButton"

function SimpleDataTable({
  columns,
  filters,
  data,
  loading,
  currentPage,
  perPage,
  pageCount,
  hasNext,
  hasPrevious,
  sortColumn,
  sortOrder,
}) {
  const router = useRouter()

  const setSort = (column) => {
    if (column.sort) {
      router.push({
        query: {
          ...router.query,
          sortColumn: column.id,
          sortOrder: column.id == sortColumn ? (sortOrder === "desc" ? "asc" : "desc") : "asc",
        },
      })
    }
  }

  const goToPreviousPage = () => {
    router.push({
      query: {
        ...router.query,
        page: currentPage - 1,
      },
    })
  }

  const goToNextPage = () => {
    router.push({
      query: {
        ...router.query,
        page: currentPage + 1,
      },
    })
  }

  const setPerPage = (value: number) => {
    router.push({
      query: {
        ...router.query,
        page: 0,
        perPage: value,
      },
    })
  }

  // Render the UI for your table
  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <FilterButton filters={filters}>
          {filters.map((filter, filterKey) => (
            <div key={filterKey}>{filter.component(filter)}</div>
          ))}
        </FilterButton>
      </div>
      <div className="-mx-4 sm:mx-0 bg-gray-50 overflow-hidden sm:shadow sm:rounded-lg mt-2">
        <div className="sm:-mx-0 overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column, columnKey) => (
                      <th
                        key={columnKey}
                        scope="col"
                        className={classNames(
                          "px-6 py-3 w-auto text-left text-xs font-medium",
                          "text-gray-500 tracking-wider uppercase whitespace-no-wrap",
                          // @ts-ignore
                          column.sort ? "cursor-pointer" : ""
                        )}
                        //@ts-ignore
                        {...(!column.sort
                          ? ""
                          : {
                              onClick: () => {
                                setSort(column)
                              },
                            })}
                      >
                        {column.label}
                        <span className="pl-1">
                          {sortColumn === column.id ? (
                            sortOrder === "desc" ? (
                              <SortDescendingIcon className="h-4 w-4 inline" />
                            ) : (
                              <SortAscendingIcon className="h-4 w-4 inline" />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowKey) => {
                    return (
                      <tr key={rowKey} className={rowKey % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        {columns.map((cell, cellKey) => {
                          return (
                            <td
                              key={rowKey + "-" + cellKey}
                              className={classNames(
                                "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                cell.className
                              )}
                            >
                              {row[cell.id]}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  {loading ? (
                    <tr>
                      <td colSpan={10000}>Loading...</td>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {data.length === 0 ? (
                    <tr className="bg-white p-6">
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 justify-center w-full"
                        colSpan={columns.length}
                      >
                        <div className="flex justify-center text-center mx-auto">
                          <div>No records found</div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Showing page{" "}
              <strong>
                <span className="font-medium">{data.length > 0 ? currentPage + 1 : 0}</span> of{" "}
                <span className="font-medium">{pageCount}</span>
              </strong>{" "}
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="mr-3">
              <select
                disabled={data.length === 0}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={perPage}
                onChange={(e) => {
                  setPerPage(parseInt(e.target.value))
                }}
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => goToPreviousPage()}
              disabled={!hasPrevious || data.length === 0}
              className={classNames(
                "relative inline-flex items-center px-4 py-2 border border-gray-300",
                "text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
                !hasPrevious || data.length === 0 ? "disabled:opacity-50 cursor-default" : ""
              )}
            >
              Previous
            </button>
            <button
              onClick={() => goToNextPage()}
              disabled={!hasNext || data.length === 0}
              className={classNames(
                "ml-3 relative inline-flex items-center px-4 py-2 border",
                "border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
                !hasNext || data.length === 0 ? "disabled:opacity-50 cursor-default" : ""
              )}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default SimpleDataTable
