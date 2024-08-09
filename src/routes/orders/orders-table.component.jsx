import { TableFa } from "@/components"
import { apiEndpoints, apiHelper, fetcher, formatters } from "@/helpers"
import { useDateFilter } from "@/hooks"
import { toISOStr } from "@/utils"
import useSWR from "swr"
import { Filter } from "./filter.component"

const COLUMN_DEFINITIONS = [
  { field: "id", headerName: "آیدی", valueFormatter: formatters.persianNumber },
  { field: "time", headerName: "آخرین به روز رسانی", valueFormatter: formatters.date },
  { field: "tyStockID", headerName: "آیدی محصول", valueFormatter: formatters.persianNumber },
  { field: "stockName", headerName: "نام محصول" },
  { field: "orderStatus", headerName: "وضعیت سفارش", valueFormatter: formatters.orderStatus },
  { field: "side", headerName: "نوع سفارش", valueFormatter: formatters.orderSide },
  { field: "price", headerName: "قیمت", valueFormatter: formatters.rial },
  { field: "volume", headerName: "مقدار", valueFormatter: formatters.persianNumber },
  { field: "value", headerName: "ارزش معامله (ریال)", valueFormatter: formatters.persianComma },
]
const COUNT_PER_PAGE = 1000
const config = apiEndpoints.customer.orders

function OrdersTable() {
  const dateFilterState = useDateFilter()
  const dataToSend = JSON.stringify({
    start: toISOStr(dateFilterState.fromDate),
    end: toISOStr(dateFilterState.toDate),
    countPerPage: COUNT_PER_PAGE,
    pageNumber: 1,
  })
  console.log(dataToSend)
  const fetcherConfig = {
    method: config.method,
    headers: apiHelper.header.jsonAndBearer,
    body: dataToSend,
  }
  const response = useSWR(config.url, fetcher(fetcherConfig), { revalidateOnFocus: false })

  return (
    <>
      <Filter {...dateFilterState} mutate={response.mutate} />
      <TableFa rowData={response.data} columnDefs={COLUMN_DEFINITIONS} />
    </>
  )
}

export { OrdersTable }
