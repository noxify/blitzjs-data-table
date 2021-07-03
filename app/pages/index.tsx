import { Suspense } from "react"
import { Link, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import OverviewTable from "@/app/dashboard/components/OverviewTable"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <OverviewTable />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
