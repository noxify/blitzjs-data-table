import { useRouter } from "blitz"

import { useTable, usePagination, useSortBy } from "react-table"

import classNames from "@/app/helpers/classNames"
import { SortAscendingIcon } from "@heroicons/react/solid"
import { SortDescendingIcon } from "@heroicons/react/outline"
import FilterButton from "@/app/filter/components/FilterButton"

function ReactDataTable({
  columns,
  filters,
  data,
  loading,
  pageIndex: controlledPageIndex,
  pageSize: controlledPageSize,
  pageCount: controlledPageCount,
  hasNext: controlledHasNext,
  hasPrevious: controlledHasPrevious,
  sortColumn,
  sortOrder,
}) {
  const router = useRouter()

  const {
    getTableBodyProps,
    headerGroups,
    prepareRow,
    columns: instanceColumns,
    //@ts-ignore
    page,
    //@ts-ignore
    pageOptions,
    // @ts-ignore
    toggleSortBy,
    // Get the state from the instance
  } = useTable(
    {
      columns,
      data,
      //@ts-ignore
      manualPagination: true,
      pageIndex: controlledPageIndex,
      pageSize: controlledPageSize,
      pageCount: controlledPageCount,
      canNextPage: controlledHasNext,
      canPreviousPage: controlledHasPrevious,
      manualSortBy: true,
      disableMultiSort: false,
    },
    useSortBy,
    usePagination
  )

  const setSort = (column) => {
    if (column.canSort) {
      instanceColumns.forEach((col) => {
        //@ts-ignore
        if (col.isSorted) {
          //@ts-ignore
          col.clearSortBy()
        }
      })

      if (column.id !== sortColumn) {
        toggleSortBy(column.id, false)
      } else {
        toggleSortBy(column.id, !column.isSortedDesc)
      }

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
        page: controlledPageIndex - 1,
      },
    })
  }

  const goToNextPage = () => {
    router.push({
      query: {
        ...router.query,
        page: controlledPageIndex + 1,
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
                  {headerGroups.map((headerGroup, groupKey) => (
                    <tr key={groupKey}>
                      {headerGroup.headers.map((column, columnKey) => (
                        <th
                          key={columnKey}
                          scope="col"
                          className={classNames(
                            "px-6 py-3 w-auto text-left text-xs font-medium",
                            "text-gray-500 tracking-wider uppercase whitespace-no-wrap",
                            // @ts-ignore
                            column.canSort ? "cursor-pointer" : ""
                          )}
                          //@ts-ignore
                          {...(!column.canSort
                            ? ""
                            : {
                                onClick: () => {
                                  setSort(column)
                                },
                              })}
                        >
                          {column.render("Header")}
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
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, rowKey) => {
                    prepareRow(row)
                    return (
                      <tr
                        {...row.getRowProps()}
                        key={rowKey}
                        className={rowKey % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        {row.cells.map((cell, cellKey) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              key={cellKey}
                              className={classNames(
                                "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                cell.column.className
                              )}
                            >
                              {cell.render("Cell")}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  <tr>
                    {loading ? (
                      // Use our custom loading state to show a loading indicator
                      <td colSpan={10000}>Loading...</td>
                    ) : (
                      <></>
                    )}
                  </tr>
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
                <span className="font-medium">{controlledPageIndex + 1}</span> of{" "}
                <span className="font-medium">{pageOptions.length}</span>
              </strong>{" "}
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="mr-3">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={controlledPageSize}
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
              disabled={!controlledHasPrevious}
              className={classNames(
                "relative inline-flex items-center px-4 py-2 border border-gray-300",
                "text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
                !controlledHasPrevious ? "disabled:opacity-50 cursor-default" : ""
              )}
            >
              Previous
            </button>
            <button
              onClick={() => goToNextPage()}
              disabled={!controlledHasNext}
              className={classNames(
                "ml-3 relative inline-flex items-center px-4 py-2 border",
                "border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
                !controlledHasNext ? "disabled:opacity-50 cursor-default" : ""
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

export default ReactDataTable
