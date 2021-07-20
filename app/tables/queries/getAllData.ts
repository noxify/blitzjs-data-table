import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTestDataInput
  extends Pick<Prisma.TestDataFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetTestDataInput) => {
  const { items, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () => db.testData.count({ where }),
    query: (paginateArgs) => db.testData.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    items,
    nextPage,
    hasMore,
    count,
  }
})
