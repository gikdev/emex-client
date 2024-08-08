import { AG_GRID_LOCALE_IR } from "@/constants"
import { AgGridReact } from "ag-grid-react"

const DEFAULT_COLUMN_DEFENITION = {
  minWidth: 200,
  filter: true,
  floatingFilter: true,
  lockPosition: true,
}

function TableFa(props) {
  return (
    <AgGridReact
      localeText={AG_GRID_LOCALE_IR}
      pagination
      paginationPageSize={20}
      enableRtl
      defaultColDef={DEFAULT_COLUMN_DEFENITION}
      {...props}
    />
  )
}

export { TableFa }
