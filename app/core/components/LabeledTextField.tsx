import { forwardRef, PropsWithoutRef } from "react"
import { useField, useFormikContext, ErrorMessage } from "formik"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const [input] = useField(name)
    const { isSubmitting } = useFormikContext()

    return (
      <div {...outerProps}>
        <label className="block text-sm font-medium text-gray-700">{label || "\u00A0"}</label>
        <div className="mt-1">
          <input {...input} disabled={isSubmitting} {...props} ref={ref} />
          <ErrorMessage name={name}>
            {(msg) => (
              <div role="alert" style={{ color: "red" }}>
                {msg}
              </div>
            )}
          </ErrorMessage>
        </div>
      </div>
    )
  }
)

export default LabeledTextField
