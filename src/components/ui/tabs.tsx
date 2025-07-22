import * as React from "react"
import { cn } from "../../lib/utils"

interface TabsProps {
  tabs: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
}

export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="flex gap-2 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 transition",
            value === tab.value
              ? "border-green-600 text-green-700 bg-neutral-100"
              : "border-transparent text-neutral-500 hover:text-green-700 hover:bg-neutral-50"
          )}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
