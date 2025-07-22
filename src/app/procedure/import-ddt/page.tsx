import { ImportDdtTable } from "@/components/ImportDdtTable";
import { LastImportDetails } from "@/components/LastImportDetails";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <ImportDdtTable />
      <LastImportDetails />
    </div>
  );
}
