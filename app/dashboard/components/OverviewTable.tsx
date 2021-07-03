import getAllData from "@/app/dashboard/queries/getAllData"
import { usePaginatedQuery, useRouter } from "blitz"

import { useMemo } from "react"
import ReactDataTable from "@/app/core/components/ReactDataTable"
import NumberRangeColumnFilter from "@/app/core/components/filter/NumberRangeColumnFilter"
import TextColumnFilter from "@/app/core/components/filter/TextColumnFilter"

function OverviewTable() {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        className: "w-20",
      },
      {
        Header: "Title",
        accessor: "title",
      },
    ],
    []
  )

  const filters = useMemo(
    () => [
      {
        accessor: "id",
        component: NumberRangeColumnFilter,
        filter: "between",
        filterLabel: "Search by id",
      },
      {
        accessor: "title",
        component: TextColumnFilter,
        filter: "contains",
        filterLabel: "Search by title",
      },
    ],
    []
  )

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const perPage = Number(router.query.perPage) || 10

  const sortColumn = (router.query.sortColumn as string) || "id"
  const sortOrder = (router.query.sortOrder as string) || "asc"

  const search = router.query.search
    ? { where: { AND: JSON.parse(router.query.search as string) } }
    : {}

  const [{ items, hasMore, count }, { isLoading }] = usePaginatedQuery(getAllData, {
    orderBy: { [sortColumn]: sortOrder },
    skip: perPage * page,
    take: perPage,
    ...search,
  })

  return (
    <ReactDataTable
      columns={columns}
      filters={filters}
      data={items}
      loading={isLoading}
      pageCount={count / perPage}
      pageIndex={page}
      pageSize={perPage}
      hasNext={hasMore}
      hasPrevious={page !== 0}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
    />
  )
}

export default OverviewTable
