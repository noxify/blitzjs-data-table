import { useRouter } from "blitz"

import { Popover, Transition } from "@headlessui/react"
import { Fragment } from "react"

import classNames from "@/app/helpers/classNames"
import { FilterIcon } from "@heroicons/react/outline"
import { Form } from "@/app/core/components/Form"

import { each, isNull, isUndefined, omit } from "lodash"

function FilterButton({ children, filters }) {
  const router = useRouter()

  const initialFilterValues = () => {
    const initial = {}

    filters.forEach((col) => {
      if (col.filter == "between") {
        initial[`${col.accessor}:gte`] = ""
        initial[`${col.accessor}:lte`] = ""
      } else {
        initial[`${col.accessor}:${col.filter}`] = ""
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
    <Popover className="">
      {({ open }) => (
        <>
          <Popover.Button
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
                  <Form
                    onSubmit={onSubmitFilter}
                    onReset={onResetFilter}
                    initialValues={initialFilterValues()}
                    resetText="Reset"
                  >
                    {children}

                    <button type="submit">Apply</button>
                  </Form>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default FilterButton
