import LabeledTextField from "@/app/core/components/LabeledTextField"

function TextColumnFilter({ id, label }) {
  return (
    <div className="grid mb-4">
      <LabeledTextField
        label={label}
        name={id + ":contains"}
        type="text"
        placeholder={`Search...`}
        className="block w-full pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  )
}

export default TextColumnFilter
