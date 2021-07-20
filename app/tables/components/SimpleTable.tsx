import getAllData from "@/app/tables/queries/getAllData"
import { usePaginatedQuery, useRouter } from "blitz"

import NumberRangeColumnFilter from "@/app/filter/components/NumberRangeColumnFilter"
import TextColumnFilter from "@/app/filter/components/TextColumnFilter"

import SimpleDataTable from "@/app/tables/components/SimpleDataTable"

const SimpleTable = () => {
  const columns = [
    {
      label: "#",
      id: "id",
      className: "w-20",
      sort: true,
    },
    {
      label: "Title",
      id: "title",
      sort: true,
    },
  ]

  const filters = [
    {
      label: "Search by id",
      id: "id",
      component: NumberRangeColumnFilter,
    },
    {
      label: "Search by title",
      id: "title",
      component: TextColumnFilter,
    },
  ]

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
    <SimpleDataTable
      columns={columns}
      filters={filters}
      data={items}
      loading={isLoading}
      pageCount={Math.ceil(count / perPage)}
      currentPage={page}
      perPage={perPage}
      hasNext={hasMore}
      hasPrevious={page !== 0}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
    />
  )
}

export default SimpleTable
