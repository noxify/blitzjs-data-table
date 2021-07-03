import LabeledTextField from "@/app/core/components/LabeledTextField"

function TextColumnFilter({ accessor: id, filterLabel }) {
  return (
    <div className="grid mb-4">
      <LabeledTextField
        label={filterLabel}
        name={id + ":contains"}
        type="text"
        placeholder={`Search...`}
      />
    </div>
  )
}

export default TextColumnFilter
