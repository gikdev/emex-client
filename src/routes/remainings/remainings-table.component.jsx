import { TableFa } from "@/components"
import { apiEndpoints, apiHelper, fetcher, formatters } from "@/helpers"
import useSWR from "swr"

const COLUMN_DEFINITIONS = [
  { field: "stockName", headerName: "نام محصول" },
  { field: "volume", headerName: "مقدار محصول", valueFormatter: formatters.debt },
]
const config = apiEndpoints.customer.portfolio
const fetcherConfig = {
  method: config.method,
  headers: apiHelper.header.bearer,
}

function RemainingsTable() {
  const response = useSWR(config.url, fetcher(fetcherConfig), { revalidateOnFocus: false })

  return <TableFa rowData={response.data} columnDefs={COLUMN_DEFINITIONS} />
}

export { RemainingsTable }
