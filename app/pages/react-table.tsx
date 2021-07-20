import { BlitzPage } from "blitz"
import Layout from "@/app/core/layouts/Layout"
import ReactTable from "../tables/components/ReactTable"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const ReactTablePage: BlitzPage = () => {
  return (
    <>
      <ReactTable />
    </>
  )
}

ReactTablePage.getLayout = (page) => <Layout title="React Data Table">{page}</Layout>

export default ReactTablePage
