import LabeledTextField from "@/app/core/components/LabeledTextField"

function NumberRangeColumnFilter({ id, label }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <LabeledTextField
        label={label}
        name={id + ":gte"}
        type="number"
        placeholder={`Min...`}
        className="block w-full pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />

      <LabeledTextField
        name={id + ":lte"}
        type="number"
        placeholder={`Max...`}
        className="block w-full pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  )
}

export default NumberRangeColumnFilter
