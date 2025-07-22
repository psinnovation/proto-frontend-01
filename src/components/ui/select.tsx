import * as React from "react"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[]
}

export function Select({ options, ...props }: SelectProps) {
  return (
    <select {...props} className="border rounded px-3 py-2 bg-neutral-100 text-sm">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
