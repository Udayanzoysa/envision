/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "lodash";

interface FormTextAreaProps {
  label: string;
  name: string;
  isRequired?: boolean;
  formik: any;
  helperText?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}

const FormTextArea = ({
  className = "",
  isRequired = false,
  label,
  name,
  formik,
  placeholder = "",
  helperText = "",
  rows = 4,
  ...props
}: FormTextAreaProps) => {
  const error = get(formik.errors, name);
  const submitCount = get(formik, "submitCount") == 0 ? false : true;

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-700 font-medium text-sm mb-1 opacity-70"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* TextArea */}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        onChange={formik.handleChange}
        value={get(formik.values, name) || ""}
        className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error && submitCount ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      ></textarea>

      {/* Helper Text */}
      {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}

      {/* Error Message */}
      {error && submitCount && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormTextArea;
