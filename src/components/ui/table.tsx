import * as React from "react"

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="min-w-full text-sm bg-white">{children}</table>
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-neutral-100">{children}</thead>
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b last:border-0">{children}</tr>
}

export function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={"px-3 py-2 " + className}>{children}</td>
}

export function TableHeaderCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={"px-3 py-2 text-left font-semibold " + className}>{children}</th>
}
