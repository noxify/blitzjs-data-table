import { BlitzPage } from "blitz"
import Layout from "@/app/core/layouts/Layout"
import SimpleTable from "../tables/components/SimpleTable"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const SimpleTablePage: BlitzPage = () => {
  return (
    <>
      <SimpleTable />
    </>
  )
}

SimpleTablePage.getLayout = (page) => <Layout title="Simple Data Table">{page}</Layout>

export default SimpleTablePage
