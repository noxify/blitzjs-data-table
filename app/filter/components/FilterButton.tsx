import { useRouter } from "blitz"

import { Popover, Transition } from "@headlessui/react"
import { Fragment, useRef } from "react"

import classNames from "@/app/helpers/classNames"
import { FilterIcon, XCircleIcon } from "@heroicons/react/outline"
import { Form } from "@/app/core/components/Form"

import { each, get, isNull, isUndefined, keys, omit } from "lodash"
import flattenObject from "@/app/helpers/flattenObject"

function FilterButton({ children, filters }) {
  const router = useRouter()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const hasActiveFilter = () => {
    return router.query.search ? true : false
  }

  const initialFilterValues = () => {
    let userValues
    if (router.query.search) {
      userValues = JSON.parse(router.query.search as string)
      userValues = userValues.map((element: { [key: string]: any }) => {
        return flattenObject(element)
      })
      userValues = userValues.reduce(function (obj, item) {
        const itemKey = keys(item)[0] as string
        obj[itemKey] = item[itemKey]
        return obj
      }, {})
    }

    const initial = {}

    filters.forEach((col) => {
      if (col.filter == "between") {
        initial[`${col.id}:gte`] = get(userValues, `${col.id}:gte`, "")
        initial[`${col.id}:lte`] = get(userValues, `${col.id}:lte`, "")
      } else {
        initial[`${col.id}:${col.filter}`] = get(userValues, `${col.id}:${col.filter}`, "")
      }
    })

    return initial
  }

  const onSubmitFilter = async (values: any) => {
    const search: Array<{ [field: string]: { [operator: string]: any } }> = []

    each(values, (value, key) => {
      const [field, operator] = key.split(":")

      if (isNull(value) || isUndefined(value) || value === "") {
        return
      }

      search.push({
        [field as string]: {
          [operator as string]: value,
        },
      })
    })

    const searchQuery = search.length > 0 ? { search: JSON.stringify(search) } : null

    router.push({
      query: {
        ...router.query,
        ...searchQuery,
        page: 0,
      },
    })
  }

  const onResetFilter = async () => {
    const query = omit(router.query, "search")

    router.push({
      query: {
        ...query,
        page: 0,
      },
    })
  }

  return (
    <>
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              ref={buttonRef}
              className={classNames(
                "relative inline-flex items-center px-4 py-2 border border-gray-300",
                "text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
                open ? "" : "text-opacity-90"
              )}
            >
              <span>Filter</span>
              <FilterIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-3/4 w-96 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative bg-white p-7">
                    <Form onSubmit={onSubmitFilter} initialValues={initialFilterValues()}>
                      {children}

                      <button
                        type="submit"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Apply
                      </button>

                      <button
                        onClick={() => onResetFilter() && buttonRef.current?.click()}
                        type="reset"
                        className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Reset
                      </button>
                    </Form>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>

      <button
        onClick={() => onResetFilter()}
        className={classNames(
          "ml-2 relative inline-flex items-center px-4 py-2 border border-gray-300",
          "text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
          !hasActiveFilter() ? "hidden" : ""
        )}
      >
        <span>Reset</span>
        <XCircleIcon
          className="ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150"
          aria-hidden={true}
        />
      </button>
    </>
  )
}

export default FilterButton
