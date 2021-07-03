import LabeledTextField from "@/app/core/components/LabeledTextField"

function NumberRangeColumnFilter({ accessor: id, filterLabel }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      <LabeledTextField
        label={filterLabel}
        name={id + ":gte"}
        type="number"
        placeholder={`Min...`}
      />

      <LabeledTextField label={" "} name={id + ":lte"} type="number" placeholder={`Max...`} />
    </div>
  )
}

export default NumberRangeColumnFilter
