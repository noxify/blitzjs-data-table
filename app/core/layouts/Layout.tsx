import { ReactNode } from "react"
import { Head, Link } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-react-table"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">{title}</h1>
          <div className="mb-8">
            <p className="inline-flex items-center pr-4 py-2 border-none text-sm font-medium text-gray-700 ">
              Choose:{" "}
            </p>

            <Link href="react-table">
              <a className=" mr-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                React Data Table
              </a>
            </Link>

            <Link href="simple-table">
              <a className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Simple Data Table
              </a>
            </Link>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout
